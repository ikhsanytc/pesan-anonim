"use client";
import React, { ChangeEvent, FC, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { blobToBase64 } from "@/utils/blob";
import { toast } from "react-toastify";

type EditAvatarClientProps = {
  avatar_url: string;
  fileNameAvatar: string;
};

const EditAvatarClient: FC<EditAvatarClientProps> = ({
  avatar_url,
  fileNameAvatar,
}) => {
  const [image, setImage] = useState(avatar_url);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [blobImg, setBlobImg] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cropRef = useRef<ReactCropperElement>(null);
  const router = useRouter();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setShowCropper(true);
    }
  };
  const handleCropImage = () => {
    const cropper = cropRef.current?.cropper;
    const croppedCanvas = cropper?.getCroppedCanvas();
    if (croppedCanvas) {
      setCroppedImg(croppedCanvas.toDataURL());
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          setBlobImg(blob);
        }
      }, "image/png");
      setShowCropper(false);
    }
  };
  const handleOnSave = async () => {
    if (!blobImg) return;
    setIsLoading(true);
    const blobBase64 = await blobToBase64(blobImg as Blob);
    const uploadAvatar = await fetch("/api/upload_avatar", {
      method: "POST",
      body: JSON.stringify({
        avatar: blobBase64,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resUploadAvatar = await uploadAvatar.json();
    if (resUploadAvatar.error) {
      toast.error(resUploadAvatar.message);
      setIsLoading(false);
      return;
    }
    const deleteAvatar = await fetch("/api/delete_avatar", {
      method: "DELETE",
      body: JSON.stringify({
        fileName: fileNameAvatar,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (fileNameAvatar !== "nophoto.jpeg") {
      const resDeleteAvatar = await deleteAvatar.json();
      if (resDeleteAvatar.error) {
        toast.error(resDeleteAvatar.message);
        setIsLoading(false);
        return;
      }
    }
    const updateUserAvatar = await fetch("/api/update_user_avatar", {
      method: "POST",
      body: JSON.stringify({
        avatar: resUploadAvatar.fileName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resUpdateUserAvatar = await updateUserAvatar.json();
    if (resUpdateUserAvatar.error) {
      toast.error(resUpdateUserAvatar.message);
      setIsLoading(false);
      return;
    }
    toast.success("Avatar berhasil diubah");
    setCroppedImg(null);
    setBlobImg(null);
    setImage(resUpdateUserAvatar.public_url);
    setIsLoading(false);
  };
  return (
    <div className="flex relative justify-center items-center">
      {showCropper ? (
        <>
          <button
            onClick={() => {
              setImage(avatar_url);
              setCroppedImg(null);
              setShowCropper(false);
              setBlobImg(null);
            }}
            className="absolute top-6 right-6 bg-black shadow cursor-pointer text-white hover:scale-105 transition duration-150 py-2 px-4 rounded-lg hover:bg-gray-800 font-semibold z-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCropImage}
            className="absolute bottom-6 right-6 bg-white/75 shadow cursor-pointer text-black hover:scale-105 transition duration-150 py-2 px-6 rounded-lg hover:bg-white font-semibold z-50"
          >
            Save
          </button>
          <Cropper
            src={image}
            style={{ height: "100vh", width: "100vw" }}
            aspectRatio={1}
            guides={true}
            ref={cropRef}
          />
        </>
      ) : (
        <>
          <motion.img
            layoutId="bg-image"
            src="/background.jpg"
            loading="lazy"
            className="w-screen h-screen object-cover"
            alt=""
          />
          <div
            onClick={() => router.push("/home")}
            className="absolute top-5 left-5 cursor-pointer"
          >
            <ChevronLeftIcon className="w-10" />
          </div>
          <div className="absolute flex flex-col justify-center items-center">
            <motion.div
              layoutId="profileAvatar"
              className="bg-white rounded-full p-2 hover:bg-opacity-50"
              onDoubleClick={() => router.push("/home")}
            >
              <img
                src={croppedImg ?? image}
                loading="lazy"
                className="w-40 rounded-full"
                alt=""
              />
            </motion.div>
            {croppedImg && !isLoading ? (
              <motion.div className="flex gap-4" exit={{ opacity: 0 }}>
                <button
                  className="bg-white/75 shadow cursor-pointer mt-5 text-black hover:scale-105 transition duration-150 py-2 px-6 rounded-lg hover:bg-white font-semibold"
                  onClick={handleOnSave}
                >
                  Upload
                </button>
                <button
                  className="bg-black shadow cursor-pointer mt-5 text-white hover:scale-105 transition duration-150 py-2 px-6 rounded-lg hover:bg-gray-800 font-semibold"
                  onClick={() => {
                    setCroppedImg(null);
                    setBlobImg(null);
                    setImage(avatar_url);
                  }}
                >
                  Ga jadi
                </button>
              </motion.div>
            ) : isLoading ? (
              <>
                <motion.div className="loaderNormal mt-6"></motion.div>
              </>
            ) : (
              <>
                <motion.label
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  htmlFor="img"
                  className="bg-white/75 shadow cursor-pointer mt-5 text-black hover:scale-105 transition duration-150 py-2 px-6 rounded-lg hover:bg-white font-semibold"
                >
                  Ganti avatar
                </motion.label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="img"
                  onChange={handleOnChange}
                  id="img"
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EditAvatarClient;
