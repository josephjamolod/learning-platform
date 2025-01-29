"use client";

import { Bell } from "lucide-react";
import GlassSheet from "../glass-sheet";

export const Notification = () => {
  return (
    <GlassSheet
      trigger={
        <span className="cursor-pointer">
          <Bell />
        </span>
      }
    >
      <div>yo</div>
    </GlassSheet>
  );
};
