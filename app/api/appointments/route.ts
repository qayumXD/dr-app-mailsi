import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const pharmacyId = searchParams.get("pharmacyId");

    const where: any = {};
    if (doctorId) where.doctorId = doctorId;
    if (pharmacyId) where.pharmacyId = pharmacyId;

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: { include: { user: true } },
        pharmacy: true,
        prescription: true,
      },
      orderBy: { tokenNumber: "asc" },
    });

    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      patientName,
      patientPhone,
      patientVillage,
      doctorId,
      pharmacyId,
      type,
      totalFee,
      bloodPressureSys,
      bloodPressureDia,
      bloodSugar,
      temperature,
      pulseRate,
      chiefComplaints,
      voiceNoteUrl,
      pastRxImages,
    } = body;

    const fee = totalFee || 1000;
    const pharmacyShare = Math.round(fee * 0.07);
    const doctorShare = Math.round(fee * 0.88);
    const platformShare = fee - pharmacyShare - doctorShare;

    // Use atomic transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find or create patient user
      let patient = await tx.user.findUnique({
        where: { phone: patientPhone },
      });

      if (!patient) {
        patient = await tx.user.create({
          data: {
            phone: patientPhone,
            fullName: patientName,
            role: "PATIENT",
          },
        });
      }

      // Calculate token number
      const count = await tx.appointment.count({
        where: { doctorId },
      });
      const tokenNumber = count + 1;

      // Create appointment
      const appointment = await tx.appointment.create({
        data: {
          tokenNumber,
          type: type || "REMOTE_VIDEO",
          status: "SCHEDULED",
          patientId: patient.id,
          doctorId,
          pharmacyId,
          patientVillage: patientVillage || "Mailsi",
          totalFee: fee,
          doctorShare,
          pharmacyShare,
          platformShare,
          bloodPressureSys,
          bloodPressureDia,
          bloodSugar,
          temperature,
          pulseRate,
          chiefComplaints,
          voiceNoteUrl,
          pastRxImages,
        },
      });

      // If booked via pharmacy, update pharmacy ledger & balance
      if (pharmacyId) {
        const netOwed = fee - pharmacyShare;
        await tx.pharmacy.update({
          where: { id: pharmacyId },
          data: {
            walletBalance: { increment: netOwed },
            totalCommission: { increment: pharmacyShare },
          },
        });

        await tx.ledgerEntry.create({
          data: {
            pharmacyId,
            amount: pharmacyShare,
            type: "COMMISSION_EARNED",
            description: `7% Cut on Token #${tokenNumber} (${patientName})`,
          },
        });
      }

      return appointment;
    });

    return NextResponse.json({ success: true, appointment: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
