"use server";

import { db } from "../../prisma/db";

export const onGetAffiliateInfo = async (id: string) => {
  try {
    const affiliateInfo = await db.affiliate.findUnique({
      where: { id },
      select: {
        Group: {
          select: {
            User: {
              select: {
                firstname: true,
                lastname: true,
                image: true,
                id: true,
                stripeId: true,
              },
            },
          },
        },
      },
    });

    if (affiliateInfo) {
      return { status: 200, user: affiliateInfo };
    }
    return { status: 404 };
  } catch {
    return { status: 404 };
  }
};
