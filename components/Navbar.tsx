"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // function to apply active styles
  const isActive = (path: string) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 font-semibold";

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Desktop & Mobile Header */}
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Job Sprint logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Job Sprint
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/jobs"
              className={`${isActive(
                "/jobs"
              )} hover:text-gray-900 px-3 py-2 text-[16px] font-medium`}
            >
              Browse Jobs
            </Link>

            {session ? (
              <>
                <Link
                  href="/jobs/posts"
                  className={`${isActive(
                    "/jobs/posts"
                  )} hover:text-gray-900 px-3 py-2 text-[16px] font-medium`}
                >
                  Post A Job
                </Link>
                <Link
                  href="/dashboard"
                  className={`${isActive(
                    "/dashboard"
                  )} hover:text-gray-900 px-3 py-2 text-[16px] font-medium`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className=" hover:text-white text-[16px] font-medium bg-indigo-600 inline-flex items-center px-3 py-2 rounded-md text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className={`${isActive(
                  "/signin"
                )} hover:text-white text-[16px] font-medium bg-indigo-600 inline-flex items-center px-3 py-2 rounded-md text-white`}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose size={28} /> : <GiHamburgerMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            href="/jobs"
            className={`block ${isActive(
              "/jobs"
            )} hover:text-gray-900 text-[16px] font-medium`}
          >
            Browse Jobs
          </Link>

          {session ? (
            <>
              <Link
                href="/jobs/posts"
                className={`block ${isActive(
                  "/jobs/posts"
                )} hover:text-gray-900 text-[16px] font-medium`}
              >
                Post A Job
              </Link>
              <Link
                href="/dashboard"
                className={`block ${isActive(
                  "/dashboard"
                )} hover:text-gray-900 text-[16px] font-medium`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left text-gray-600 hover:text-gray-900 text-[16px] font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              className={`${isActive(
                "/signin"
              )} hover:text-white text-[16px] font-medium bg-indigo-600 inline-flex items-center px-3 py-2 rounded-md text-white`}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
