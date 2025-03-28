import React, { FC } from "react";
import MessageComponent from "../Inbox/message-component";
import { InboxIcon } from "@heroicons/react/24/solid";
import InboxType from "@/utils/types/inbox";

type InboxProps = {
  loading: boolean;
  inbox: InboxType[];
};

const InboxComponent: FC<InboxProps> = ({ inbox, loading }) => {
  return (
    <div className="flex flex-col w-full mt-10 gap-4 text-center items-center">
      {!loading &&
        inbox.map((data, i) => <MessageComponent key={i} inbox={data} />)}
      {loading && <div className="loader"></div>}
      {!loading && inbox.length === 0 && (
        <div className="flex flex-col mt-6 justify-center items-center">
          <InboxIcon className="w-32" />
          <h1 className="text-3xl font-bold">
            Your inbox is <span className="text-red-500">empty!</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default InboxComponent;
