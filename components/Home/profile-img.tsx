import { useRouter } from "next/navigation";
import { FC } from "react";
import { motion } from "motion/react";
import { PencilIcon } from "@heroicons/react/24/solid";

type ProfileImageProps = {
  path: string;
};

const ProfileImage: FC<ProfileImageProps> = ({ path }) => {
  const router = useRouter();
  return (
    <motion.div
      layoutId="profileAvatar"
      onClick={() => router.push("/home/edit_avatar")}
      className="bg-white relative rounded-full p-1 cursor-pointer hover:bg-opacity-50"
    >
      <img
        src={path}
        loading="lazy"
        className="w-24 rounded-full active:w-32 hover:w-28 transition-all duration-150"
        alt=""
      />
      <div className="absolute -bottom-1 right-0 bg-white rounded-full p-2 flex justify-center items-center">
        <PencilIcon className="w-5" />
      </div>
    </motion.div>
  );
};

export default ProfileImage;
