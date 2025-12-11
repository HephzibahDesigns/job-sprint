"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");

    try {
      await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
      });
      setApplicationStatus("success");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to apply for the job");
      }
      setApplicationStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (applicationStatus === "success") {
    return (
      <div className="text-center">
        <p className="text-green-600 font-medium mb-4">
          Application submitted successfully!
        </p>
        <Link
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View your applications →
        </Link>
      </div>
    );
  }

  return (
    <>
      <button
        type="submit"
        onClick={handleApply}
        disabled={isLoading}
        className=" w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {isLoading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          "Apply for this position"
        )}
      </button>
      {applicationStatus === "error" && (
        <p className="mt-2 text-red-600 text-center">{errorMessage}</p>
      )}
    </>
  );
};

export default ApplyButton;
