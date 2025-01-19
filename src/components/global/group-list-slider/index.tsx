import { UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { createGroupSchema } from "../../../../schemas/payment-form-schema";
import { SwiperSlide, type SwiperProps } from "swiper/react";
import { Slider } from "../slider";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LOGO_CONSTANTS } from "@/constants";
import { GroupListItem } from "./list-item";
import "swiper/css/bundle";

type GroupListProps = {
  overlay?: boolean;
  selected?: string | undefined;
  register?: UseFormRegister<z.infer<typeof createGroupSchema>>;
  label?: string;
  route?: boolean;
} & SwiperProps;

export const GroupListSlider = ({
  selected,
  label,
  register,
  route,
  overlay,
  ...rest
}: GroupListProps) => {
  return (
    <Slider
      slidesPerView={"auto"}
      spaceBetween={10}
      loop
      freeMode
      label={label}
      overlay={overlay}
      {...rest}
    >
      {LOGO_CONSTANTS.groupList.map((item, index) => (
        <SwiperSlide key={item.id} className="content-width-slide ">
          {!register ? (
            route ? (
              <Link href={`/explore/${item.path}`}>
                <GroupListItem {...item} selected={selected} />
              </Link>
            ) : (
              <GroupListItem {...item} />
            )
          ) : (
            index > 0 && (
              <Label htmlFor={`item-${item.id}`}>
                <span>
                  <Input
                    id={`item-${item.id}`}
                    type="radio"
                    className="hidden"
                    value={item.path}
                    {...register("category")}
                  />

                  <GroupListItem {...item} selected={selected} />
                </span>
              </Label>
            )
          )}
        </SwiperSlide>
      ))}
    </Slider>
  );
};
