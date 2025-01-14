"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../prisma/db";

export const onAuthenticateUser = async () => {
  try {
    const clerk = await currentUser();
    if (!clerk) return { status: 404 };
    const user = await db.user.findUnique({
      where: {
        clerkId: clerk.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });
    if (user) {
      return {
        status: 200,
        id: user.id,
        image: clerk.imageUrl,
        username: `${user.firstname} ${user.lastname}`,
      };
    }
    return {
      status: 404,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 404,
    };
  }
};
