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
  } catch {
    return {
      status: 404,
    };
  }
};

interface OnSignUpUserProp {
  firstname: string;
  lastname: string;
  image: string;
  clerkId: string;
}

export const onSignUpUser = async (values: OnSignUpUserProp) => {
  try {
    const createdUser = await db.user.create({ data: { ...values } });
    if (createdUser) {
      return {
        status: 200,
        message: "User Created Successfully!",
        id: createdUser.id,
      };
    }

    return { status: 400, message: "User could not created, please try again" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return {
      status: 400,
      message: "Oops! Something went wrong, please try again",
    };
  }
};

export const onSignInUser = async (clerkId: string) => {
  try {
    //check user if exist in db using clerkId
    const loggedInUser = await db.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        group: {
          select: {
            id: true,
            channel: {
              select: { id: true },
              take: 1,
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });

    if (loggedInUser) {
      if (loggedInUser.group.length > 0) {
        return {
          status: 207,
          id: loggedInUser.id,
          groupId: loggedInUser.group[0].id,
          channelId: loggedInUser.group[0].channel[0].id,
        };
      }
      return {
        status: 200,
        message: "User successfully logged in",
        id: loggedInUser.id,
      };
    }
    return {
      status: 400,
      message: "User could not be logged in! Try again",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return {
      status: 400,
      message: "Oops! Something went wrong. Try again",
    };
  }
};
