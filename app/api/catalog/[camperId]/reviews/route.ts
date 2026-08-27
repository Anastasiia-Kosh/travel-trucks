import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "@/app/api/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ camperId: string }> },
) {
  try {
    const { camperId } = await params;

    const res = await api.get(`/campers/${camperId}/reviews`);

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
