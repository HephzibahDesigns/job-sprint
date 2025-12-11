"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className=" bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href={"/"} className="flex items-center">
              <Image
                src="/logo.png"
                alt="Job Board logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Job Sprint
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href={"/jobs"}
              className=" text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Browse Jobs
            </Link>
            {session ? (
              <>
                <Link
                  href={"/jobs/posts"}
                  className=" text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Post A Job
                </Link>
                <Link
                  href={"/dashboard"}
                  className=" text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboards
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                SIgn In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
