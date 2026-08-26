import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../api";

export async function GET() {
  try {
    const res = await api.get("/campers/filters");
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
