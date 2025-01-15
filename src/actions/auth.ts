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

interface OnSignUpUserProp {
  firstname: string;
  lastname: string;
  image: string;
  clerkId: string;
}

export const onSignUpUser = async (values: OnSignUpUserProp) => {
  try {
    //todo
    //validate data using signUpSchema

    //check user if already has an acc. return error if have
    // const existingUser=await db.user.findUnique({where:{clerkId:values.clerkId}})
    //hash the password
    //create the user
    //if return a response, select the all except password

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
    console.log(error);
    return {
      status: 400,
      message: "Oops! Something went wrong, please try again",
    };
  }
};
