import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appointmentId, isHandwrittenPad, padPhotoUrl, diagnosis, instructions, medicines } = body;

    const result = await prisma.$transaction(async (tx) => {
      const prescription = await tx.prescription.create({
        data: {
          appointmentId,
          isHandwrittenPad: Boolean(isHandwrittenPad),
          padPhotoUrl,
          diagnosis,
          instructions,
          medicinesJson: medicines ? JSON.stringify(medicines) : null,
        },
      });

      await tx.appointment.update({
        where: { id: appointmentId },
        data: { status: "COMPLETED" },
      });

      return prescription;
    });

    return NextResponse.json({ success: true, prescription: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
