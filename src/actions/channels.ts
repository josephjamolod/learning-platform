"use server";

import { db } from "../../prisma/db";
import { onAuthenticateUser } from "./auth";

export const onGetChannelInfo = async (channelid: string) => {
  try {
    const user = await onAuthenticateUser();
    const channel = await db.channel.findUnique({
      where: {
        id: channelid,
      },
      include: {
        Post: {
          take: 3,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            channel: {
              select: {
                name: true,
              },
            },
            Author: {
              select: {
                firstname: true,
                lastname: true,
                image: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            likes: {
              where: {
                userId: user.id!,
              },
              select: {
                userId: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return channel;
  } catch {
    return { status: 400, message: "Oops! something went wrong" };
  }
};

export const onCreateNewChannel = async (
  groupid: string,
  data: {
    id: string;
    name: string;
    icon: string;
  }
) => {
  try {
    const channel = await db.group.update({
      where: {
        id: groupid,
      },
      data: {
        channel: {
          create: {
            ...data,
          },
        },
      },
      select: {
        channel: true,
      },
    });

    if (channel) {
      return { status: 200, channel: channel.channel };
    }

    return {
      status: 404,
      message: "Channel could not be created",
    };
  } catch {
    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  }
};

export const onUpdateChannelInfo = async (
  channelid: string,
  name?: string,
  icon?: string
) => {
  try {
    if (name) {
      const channel = await db.channel.update({
        where: {
          id: channelid,
        },
        data: {
          name,
        },
      });

      if (channel) {
        return {
          status: 200,
          message: "Channel name successfully updated",
        };
      }
      return {
        status: 404,
        message: "Channel not found! try again later",
      };
    }
    if (icon) {
      const channel = await db.channel.update({
        where: {
          id: channelid,
        },
        data: {
          icon,
        },
      });
      if (channel) {
        return {
          status: 200,
          message: "Channel icon successfully updated",
        };
      }
      return {
        status: 404,
        message: "Channel not found! try again later",
      };
    } else {
      const channel = await db.channel.update({
        where: {
          id: channelid,
        },
        data: {
          icon,
          name,
        },
      });
      if (channel) {
        return {
          status: 200,
          message: "Channel successfully updated",
        };
      }
      return {
        status: 404,
        message: "Channel not found! try again later",
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Oops! something went wrong" };
  }
};

export const onDeleteChannel = async (channelId: string) => {
  try {
    const channel = await db.channel.delete({
      where: {
        id: channelId,
      },
    });

    if (channel) {
      return { status: 200, message: "Channel deleted successfully" };
    }

    return { status: 404, message: "Channel not found!" };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Oops! something went wrong" };
  }
};
