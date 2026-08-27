import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const location = request.nextUrl.searchParams.get("location")?.trim() ?? "";
    const form = request.nextUrl.searchParams.get("form") ?? "";
    const engine = request.nextUrl.searchParams.get("engine") ?? "";
    const transmission = request.nextUrl.searchParams.get("transmission") ?? "";

    const res = await api.get("/campers", {
      params: {
        page,
        perPage: 4,
        ...(location && { location }),
        ...(form && { form }),
        ...(engine && { engine }),
        ...(transmission && { transmission }),
      },
    });
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
