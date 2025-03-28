"use client";
import relativeDate from "@/utils/relativeDate";
import InboxType from "@/utils/types/inbox";
import {
  ChevronRightIcon,
  InboxArrowDownIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type MessageComponentProps = {
  inbox: InboxType;
};

const MessageComponent: FC<MessageComponentProps> = ({ inbox }) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push(`/home/inbox/view/${inbox.id}`)}
        className="w-full bg-slate-100 p-2 rounded-xl flex justify-between items-center cursor-pointer"
      >
        <div className="flex gap-2 text-start items-center">
          <div>
            {inbox.read ? (
              <InboxIcon className="w-10" />
            ) : (
              <InboxArrowDownIcon className="w-10" />
            )}
          </div>
          <div className="">
            <h1 className="font-bold">{inbox.message}</h1>
            <p className="text-slate-500 text-sm">
              Dari teman • {relativeDate(inbox.created_at)}
            </p>
          </div>
        </div>
        <div>
          <ChevronRightIcon className="w-10" />
        </div>
      </div>
    </>
  );
};

export default MessageComponent;
