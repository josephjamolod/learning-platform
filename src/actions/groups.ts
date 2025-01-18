"use server";

import { z } from "zod";
import { db } from "../../prisma/db";
import { createGroupSchema } from "../../schemas/payment-form-schema";
import { v4 as uuidv4 } from "uuid";

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

export const onCreateNewGroup = async (
  userId: string,
  data: z.infer<typeof createGroupSchema>
) => {
  try {
    const createdGroup = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        group: {
          create: {
            ...data,
            affiliate: {
              create: {},
            },
            member: {
              create: {
                userId: userId,
              },
            },
            channel: {
              create: [
                {
                  id: uuidv4(),
                  name: "general",
                  icon: "general",
                },
                {
                  id: uuidv4(),
                  name: "announcements",
                  icon: "announcement",
                },
              ],
            },
          },
        },
      },
      select: {
        id: true,
        group: {
          select: {
            id: true,
            channel: {
              select: {
                id: true,
              },
              take: 1,
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });

    if (createdGroup) {
      return {
        status: 200,
        data: createdGroup,
        message: "Group created successfully",
      };
    }
  } catch {
    return {
      status: 400,
      message: "Oops! group creation failed, try again later",
    };
  }
};
