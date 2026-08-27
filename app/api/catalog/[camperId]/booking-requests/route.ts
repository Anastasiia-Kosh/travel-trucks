import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "@/app/api/api";
import { BookingRequestData } from "@/types/camper";


export async function POST(
  request: Request,
  { params }: { params: Promise<{ camperId: string }> },
) {
  try {
    const { camperId } = await params;
  const body: BookingRequestData = await request.json();
    const res = await api.post(`/campers/${camperId}/booking-requests`, body);

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}