import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const products = await prisma.product.findMany({
    // where: {
    //   name: query,
    // }, // строгое сравнение ===

    where: {
      name: {
        contains: query, // Будет работать как includes
        mode: "insensitive", //убираем барьер по верхнему или нижнему регистру
      },
    },
  });

  return NextResponse.json(products);
}
