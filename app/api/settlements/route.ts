import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pharmacyId, amount, transactionRef } = body;

    const result = await prisma.$transaction(async (tx) => {
      const pharmacy = await tx.pharmacy.update({
        where: { id: pharmacyId },
        data: {
          walletBalance: 0,
        },
      });

      const entry = await tx.ledgerEntry.create({
        data: {
          pharmacyId,
          amount: amount || pharmacy.walletBalance,
          type: "REMITTANCE_SETTLED",
          description: `Settled via JazzCash/Raast (Ref: ${transactionRef || "TX-MANUAL"})`,
        },
      });

      return { pharmacy, entry };
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
