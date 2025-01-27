import React from "react";

import { cn } from "@/lib/utils";

import Dropdown from "../drop-down";
import { IconRenderer } from "../icon-renderer";
import { ICON_LIST } from "@/constants/icons";

type Props = {
  ref: React.RefObject<HTMLButtonElement | null>;
  icon: string;
  page?: string;
  channelid: string;
  currentIcon?: string;
  onSetIcon(icon: string): void;
};

const IconDropDown = ({
  ref,
  icon,
  page,
  channelid,
  onSetIcon,
  currentIcon,
}: Props) => {
  return (
    <Dropdown
      ref={ref}
      title="Pick your icon"
      trigger={
        <span>
          <IconRenderer
            icon={icon}
            mode={page === channelid ? "LIGHT" : "DARK"}
          />
        </span>
      }
    >
      <div id="icon-list" className="flex gap-x-2">
        {ICON_LIST.map(
          (icons) =>
            icons.label !== icon && (
              <span
                key={icons.id}
                className={cn(
                  currentIcon === icons.label ? "bg-themeGray" : "",
                  "p-2 rounded-lg"
                )}
                onClick={() => onSetIcon(icons.label)}
              >
                <IconRenderer
                  icon={icons.label}
                  mode={page === channelid ? "LIGHT" : "DARK"}
                />
              </span>
            )
        )}
      </div>
    </Dropdown>
  );
};

export default IconDropDown;
