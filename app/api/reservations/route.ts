import { NextResponse } from "next/server";

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes?: string;
  locale?: string;
}

export async function POST(request: Request) {
  try {
    const data: ReservationData = await request.json();

    // Validate required fields
    const required: (keyof ReservationData)[] = [
      "name",
      "email",
      "phone",
      "date",
      "time",
      "guests",
    ];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // TODO: Integrate with Google Sheets / Telegram bot / WhatsApp
    // For now, log the reservation and return success
    console.log("New reservation:", {
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Placeholder for webhook integration
    // const WEBHOOK_URL = process.env.RESERVATION_WEBHOOK_URL;
    // if (WEBHOOK_URL) {
    //   await fetch(WEBHOOK_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    // }

    return NextResponse.json(
      { success: true, message: "Reservation received" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
