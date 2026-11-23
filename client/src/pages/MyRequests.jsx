import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  ClipboardList,
  Clock,
  Star,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/requests";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/my-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch your requests");
      }

      setRequests(data.requests || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  let isMounted = true;

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/my-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch your requests");
      }

      if (isMounted) {
        setRequests(data.requests || []);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message || "Something went wrong");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  loadRequests();

  return () => {
    isMounted = false;
  };
}, []);

  const getStatusStyle = (status) => {
    const styles = {
      open: "bg-emerald-100 text-emerald-700",
      accepted: "bg-blue-100 text-blue-700",
      "in-progress": "bg-amber-100 text-amber-700",
      "completion-requested": "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      disputed: "bg-red-100 text-red-700",
      cancelled: "bg-gray-100 text-gray-600",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  const formatStatus = (status) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 transition hover:text-purple-600"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/create-request"
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            <Plus size={18} />
            Post a Request
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-600">
            Your Activity
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            My Requests
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your posted requests and track their progress.
          </p>
        </div>

        {/* Summary Card */}
        <div className="mb-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <ClipboardList size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {requests.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
            <p className="text-gray-500">Loading your requests...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
            <AlertCircle className="mx-auto mb-4 text-red-500" size={40} />

            <h3 className="text-lg font-semibold text-gray-900">
              Unable to load requests
            </h3>

            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <button
              onClick={fetchMyRequests}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && requests.length === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <ClipboardList size={36} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              No requests yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven't posted any requests yet. Create your first request
              and connect with students who can help you.
            </p>

            <Link
              to="/create-request"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              <Plus size={18} />
              Create Your First Request
            </Link>
          </div>
        )}

        {/* Request Cards */}
        {!loading && !error && requests.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="rounded-lg bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700">
                    {request.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      request.status
                    )}`}
                  >
                    {formatStatus(request.status)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {request.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                  {request.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-5 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-purple-600" />
                    {request.duration} minutes
                  </div>

                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-amber-500" />
                    {request.points} PeerPoints
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Posted{" "}
                    {request.createdAt
                      ? new Date(request.createdAt).toLocaleDateString()
                      : ""}
                  </span>

                  <Link
                    to={`/request/${request._id}`}
                    className="rounded-xl border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyRequests;