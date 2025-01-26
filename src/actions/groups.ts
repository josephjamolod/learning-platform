"use server";

import { z } from "zod";
import { db } from "../../prisma/db";
import { createGroupSchema } from "../../schemas/payment-form-schema";
import { v4 as uuidv4 } from "uuid";
import { onAuthenticateUser } from "./auth";

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
                userId,
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

export const onGetGroupInfo = async (groupid: string) => {
  try {
    const user = await onAuthenticateUser();
    const group = await db.group.findUnique({
      where: {
        id: groupid,
      },
    });

    if (group)
      return {
        status: 200,
        group,
        groupOwner: user.id === group.userId ? true : false,
      };

    return { status: 404 };
  } catch (error) {
    console.log(error);
    return { status: 400 };
  }
};

export const onGetUserGroups = async (userId: string) => {
  try {
    const groups = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        group: {
          select: {
            id: true,
            name: true,
            icon: true,
            channel: {
              where: {
                name: "general",
              },
              select: {
                id: true,
              },
            },
          },
        },
        membership: {
          select: {
            Group: {
              select: {
                id: true,
                icon: true,
                name: true,
                channel: {
                  where: {
                    name: "general",
                  },
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (groups && (groups.group.length > 0 || groups.membership.length > 0)) {
      return {
        status: 200,
        groups: groups.group,
        members: groups.membership,
      };
    }

    return {
      status: 404,
    };
  } catch {
    return { status: 400 };
  }
};

export const onGetGroupChannels = async (groupid: string) => {
  try {
    const channels = await db.channel.findMany({
      where: { groupId: groupid },
      orderBy: {
        createdAt: "asc",
      },
    });
    // console.log(channels);

    return { status: 200, channels };
  } catch {
    return { status: 400, message: "Oops! Something went wrong" };
  }
};

export const onGetGroupSubscriptions = async (groupid: string) => {
  try {
    const subscriptions = await db.subscription.findMany({
      where: { id: groupid },
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await db.members.count({
      where: {
        groupId: groupid,
      },
    });

    if (subscriptions) {
      return { status: 200, subscriptions, count };
    }
  } catch {
    return { status: 400 };
  }
};

export const onGetAllGroupMembers = async (groupid: string) => {
  try {
    const user = await onAuthenticateUser();
    const members = await db.members.findMany({
      where: {
        groupId: groupid,
        NOT: {
          userId: user.id,
        },
      },
      include: {
        User: true,
      },
    });

    // Always return an object, even if members is empty
    if (members && members.length > 0) {
      return { status: 200, members };
    }

    // Return an empty array if no members are found
    return { status: 200, members: [] };
  } catch {
    return { status: 400, message: "Oops something went wrong" };
  }
};
