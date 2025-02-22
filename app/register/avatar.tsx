"use client";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from "react-toastify";
import { blobToBase64 } from "@/utils/blob";

type AvatarProps = {
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

const Avatar: FC<AvatarProps> = ({ setCurrentPage }) => {
  const [image, setImage] = useState("/nophoto.jpeg");
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [blobImg, setBlobImg] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cropRef = useRef<ReactCropperElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    setIsLoading(true);
    const blobBase64 = await blobToBase64(blobImg as Blob);
    const res = await fetch("/api/upload_avatar", {
      method: "POST",
      body: JSON.stringify({
        avatar: blobBase64,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      localStorage.setItem(
        "inforAvatar",
        JSON.stringify({
          avatar: data.fileName,
        })
      );
      setIsLoading(false);
      toast.success("Ok");
      setCurrentPage("proses");
    }, 2000);
  };

  const handleOnSaveWithSkip = () => {
    localStorage.setItem(
      "inforAvatar",
      JSON.stringify({
        avatar: "nophoto.jpeg",
      })
    );
    toast.success("Ok");
    setCurrentPage("proses");
  };

  useEffect(() => {
    const inforAge = JSON.parse(localStorage.getItem("inforAge") as string);
    const inforUsername = JSON.parse(
      localStorage.getItem("inforUsername") as string
    );
    const inforAvatar = JSON.parse(
      localStorage.getItem("inforAvatar") as string
    );
    if (!inforAge) {
      setCurrentPage("age");
      return;
    }
    if (!inforUsername) {
      setCurrentPage("username");
      return;
    }
    if (inforAvatar) {
      setCurrentPage("proses");
      return;
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key="avatarPage"
      className="flex flex-col items-center justify-center"
    >
      {showCropper ? (
        <div className="relative">
          <button
            onClick={() => {
              setImage("nophoto.jpeg");
              setCroppedImg(null);
              setBlobImg(null);
              setShowCropper(false);
              return;
            }}
            className="absolute top-6 right-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 z-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCropImage}
            className="absolute bottom-6 right-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 z-50"
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            className={`absolute backdrop-filter backdrop-blur w-full h-full p-2 min-h-screen bg-opacity-30 bg-gray-900 z-50 ${
              isLoading
                ? "flex flex-col gap-2 justify-center items-center"
                : "hidden"
            }`}
          >
            <div className="loaderNormal"></div>
            <h1 className="text-white text-center text-3xl font-semibold">
              Uploading...
            </h1>
          </div>
          <h1 className="text-4xl text-center font-bold mb-6">
            Tentukan avatar
          </h1>
          <div className="p-2 relative bg-gradient-to-b from-pink-500 to-orange-600 rounded-full">
            <img
              src={croppedImg ?? image}
              className="rounded-full w-56"
              alt="img preview"
              id="preview-img"
            />
            <div className="absolute bottom-6 right-6">
              <PencilSquareIcon className="w-10" />
            </div>
          </div>
          <label
            htmlFor="img"
            className="bg-blue-500 cursor-pointer mt-5 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            {croppedImg ? "Ganti avatar" : "Pilih avatar"}
          </label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            name="img"
            onChange={handleChange}
            id="img"
          />
          {croppedImg ? (
            <button
              className="bg-green-500 cursor-pointer mt-5 text-white py-2 px-6 rounded-lg hover:bg-green-600"
              onClick={handleOnSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 cursor-pointer mt-5 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
              onClick={handleOnSaveWithSkip}
            >
              Skip
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Avatar;
