import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

type NavbarHomeLayangProps = {
  inView: boolean;
  menuStatus: boolean;
  setMenuStatus: Dispatch<SetStateAction<boolean>>;
};

const NavbarHomeLayang: FC<NavbarHomeLayangProps> = ({
  inView,
  menuStatus,
  setMenuStatus,
}) => {
  return (
    <div
      className={`fixed top-0 bg-black bg-opacity-85 backdrop-filter backdrop-blur ${
        inView
          ? "w-0 opacity-0 pointer-events-none text-black"
          : "w-full text-white"
      } p-4 z-50 transition-all duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-center gap-4">
        {inView ? null : (
          <>
            <h1 className="text-3xl font-bold">Anonim</h1>
            <div className="lg:flex hidden gap-4 text-2xl font-bold">
              <Link href="" className="hover:underline underline-offset-4">
                About
              </Link>
              <Link href="" className="hover:underline underline-offset-4">
                Blog
              </Link>
              <Link href="" className="hover:underline underline-offset-4">
                Contact Us
              </Link>
            </div>
            <Link
              href="/register"
              className="text-2xl lg:block hidden font-bold hover:text-pink-500"
            >
              Try It
            </Link>
            {menuStatus ? (
              <div
                onClick={() => setMenuStatus(false)}
                className="lg:hidden cursor-pointer"
              >
                <XMarkIcon className="w-10" />
              </div>
            ) : (
              <div
                onClick={() => setMenuStatus(true)}
                className="lg:hidden cursor-pointer"
              >
                <Bars3Icon className="w-10" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarHomeLayang;
