import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const [applications, postedJobs] = await Promise.all([
    prisma.application.findMany({
      where: { userId: session.user.id },
      include: {
        job: {
          include: { postedBy: true },
        },
      },
      orderBy: { appliedAt: "desc" },
    }),

    prisma.job.findMany({
      where: { postedById: session.user.id },
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { postedAt: "desc" },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Dashboard
      </h1>

      {/* Responsive grid */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {/* Posted Jobs Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h2 className="text-xl font-semibold text-gray-900">Posted Jobs</h2>
            <Link
              href="/jobs/posts"
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Post New Job
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {postedJobs.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">
                You haven't posted any jobs yet.
              </p>
            ) : (
              postedJobs.map((job) => (
                <div key={job.id} className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1 wrap-break-word">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-2 wrap-break-word">
                        {job.company}
                      </p>

                      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-2 gap-y-1">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(new Date(job.postedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 whitespace-nowrap">
                        {job._count.applications} applications
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Applications Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Your Applications
          </h2>

          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {applications.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">
                You haven't applied to any jobs yet.
              </p>
            ) : (
              applications.map((application) => (
                <div key={application.id} className="p-5 sm:p-6">
                  {/* Card container */}
                  <div className="flex flex-col gap-2 sm:flex-col">
                    {/* Keep mobile stacked, desktop will adjust automatically */}
                    <div className="flex items-center justify-between">
                      {/* Title */}
                      <h3 className="text-lg font-medium text-gray-900 wrap-break-word">
                        {application.job.title}
                      </h3>

                      {/* STATUS BADGE */}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ml-2 sm:ml-0 ${
                          application.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>

                    {/* Company */}
                    <p className="text-gray-600 mb-2 wrap-break-word">
                      {application.job.company}
                    </p>

                    {/* Job details */}
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-2 gap-y-1">
                      <span>{application.job.location}</span>
                      <span>•</span>
                      <span>{application.job.type}</span>
                      <span>•</span>
                      <span>
                        Applied{" "}
                        {formatDistanceToNow(new Date(application.appliedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* View Job button */}
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/jobs/${application.job.id}`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
