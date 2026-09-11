import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { buyerId, contactId, role, companyName } = body;

    if (!buyerId) {
      return NextResponse.json(
        { error: "missing_buyer_id", message: "buyerId is required." },
        { status: 400 }
      );
    }

    // Simulate 400ms queuing delay
    await new Promise((res) => setTimeout(res, 400));

    const ticketId = `RES-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      ticketId,
      creditsDeducted: 3,
      turnaroundHours: 48,
      status: "queued",
      message: `Ticket #${ticketId} dispatched to Human Research Team. Our analysts are manually investigating company procurement leads on LinkedIn (48hr turnaround).`,
    });
  } catch (err) {
    console.error("Human research dispatch error:", err);
    return NextResponse.json(
      { error: "internal_error", message: "Failed to queue human research request." },
      { status: 500 }
    );
  }
}
