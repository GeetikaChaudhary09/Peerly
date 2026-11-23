import { useEffect, useState } from "react";
import { Search, Clock3, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function FindHelp() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message || "Failed to fetch requests");
          return;
        }

        setRequests(data.requests);
      } catch (error) {
        console.error("Fetch requests error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8fc] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Sparkles size={17} />
            </div>

            <span className="text-xl font-extrabold tracking-[-0.04em]">
              Peerly
            </span>
          </Link>

          <Link
            to="/dashboard"
            className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            Back to dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:py-10">
        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-violet-600">
            Peerly Marketplace
          </p>

          <h1 className="mt-2 font-serif text-[2.5rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[3rem]">
            Find someone to help.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Browse requests from students and use your skills to earn
            PeerPoints.
          </p>
        </div>

        {/* Search */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search requests, skills or topics..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <button className="rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "All",
            "Java & DSA",
            "DBMS & SQL",
            "Web Development",
            "Design",
            "Other",
          ].map((category, index) => (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                index === 0
                  ? "bg-violet-100 text-violet-700"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div className="mt-10 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Open requests
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Requests you can help with right now.
            </p>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {requests.length} requests
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              Loading requests...
            </p>
          </div>
        )}

        {/* Requests */}
        {!loading && requests.length > 0 && (
          <div className="mt-4 space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  {/* User */}
                  <div className="flex items-start gap-4 lg:w-[250px]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                      {request.requester?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "P"}
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Student
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {request.requester?.name || "Anonymous peer"}
                      </p>
                    </div>
                  </div>

                  {/* Request info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-950">
                        {request.title}
                      </h3>

                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700">
                        {request.category}
                      </span>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      {request.description}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={13} />
                        {request.duration}
                      </span>

                      <span>•</span>

                      <span className="font-semibold text-violet-600">
                        {request.points} PeerPoints
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="flex shrink-0 lg:w-[130px] lg:justify-end">
                    <Link
                      to={`/request/${request._id}`}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 lg:w-auto"
                    >
                      View request

                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && requests.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Search size={20} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              No open requests yet
            </h3>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-400">
              New requests from students will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default FindHelp; 