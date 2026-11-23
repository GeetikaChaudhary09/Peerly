import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  FileText,
  Heart,
  MessageSquare,
  Sparkles,
  User,
  Wallet,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/requests";

function RequestDetails() {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [accepting, setAccepting] = useState(false);
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  // -----------------------------------------
  // Fetch request details
  // -----------------------------------------
  const fetchRequest = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load request");
      }

      setRequest(data.request);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  let isMounted = true;

  const loadRequest = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load request");
      }

      if (isMounted) {
        setRequest(data.request);
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

  loadRequest();

  return () => {
    isMounted = false;
  };
}, [id, token]);

  // -----------------------------------------
  // Accept request
  // -----------------------------------------
  const handleAccept = async () => {
    try {
      setAccepting(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/${id}/accept`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to accept request");
      }

      setRequest(data.request);
      setSuccess("Request accepted successfully!");
    } catch (err) {
      setError(err.message || "Unable to accept request");
    } finally {
      setAccepting(false);
    }
  };

  // -----------------------------------------
  // Loading state
  // -----------------------------------------
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f8fc]">
        <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

        <p className="text-sm text-slate-500">
          Loading request details...
        </p>
      </div>
    );
  }

  // -----------------------------------------
  // Error state
  // -----------------------------------------
  if (error && !request) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f8fc] px-5">
        <AlertCircle size={42} className="mb-4 text-red-500" />

        <h2 className="text-xl font-bold text-slate-900">
          Unable to load request
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          {error}
        </p>

        <button
          onClick={fetchRequest}
          className="mt-6 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
        >
          <RefreshCw size={16} />
          Try Again
        </button>

        <Link
          to="/find-help"
          className="mt-4 text-sm font-medium text-violet-600"
        >
          Back to Find Help
        </Link>
      </div>
    );
  }

  if (!request) {
    return null;
  }

  // -----------------------------------------
  // Current logged-in user
  // -----------------------------------------
  let currentUser = {};

  try {
    currentUser =
      JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    currentUser = {};
  }

  // -----------------------------------------
  // Requester
  // -----------------------------------------
  const requester =
    request.requester &&
    typeof request.requester === "object"
      ? request.requester
      : {};

  const requesterId =
    requester._id || request.requester;

  const currentUserId =
    currentUser._id ||
    currentUser.id ||
    currentUser.userId;

  const isOwner =
    requesterId &&
    currentUserId &&
    String(requesterId) === String(currentUserId);

  // -----------------------------------------
  // Helper
  // -----------------------------------------
  const helper =
    request.helper &&
    typeof request.helper === "object"
      ? request.helper
      : null;

  const helperId =
    helper?._id ||
    (typeof request.helper === "string"
      ? request.helper
      : null);

  const isHelper =
    helperId &&
    currentUserId &&
    String(helperId) === String(currentUserId);

  // -----------------------------------------
  // Status
  // -----------------------------------------
  const isOpen = request.status === "open";

  const workspaceStatuses = [
    "accepted",
    "in-progress",
    "completion-requested",
    "completed",
    "disputed",
  ];

  const canOpenWorkspace =
    workspaceStatuses.includes(request.status) &&
    request.helper;

  const statusStyles = {
    open: "bg-emerald-50 text-emerald-700",
    accepted: "bg-blue-50 text-blue-700",
    "in-progress": "bg-amber-50 text-amber-700",
    "completion-requested":
      "bg-violet-50 text-violet-700",
    completed: "bg-green-50 text-green-700",
    disputed: "bg-red-50 text-red-700",
    cancelled: "bg-slate-100 text-slate-600",
  };

  const formatStatus = (status = "open") =>
    status
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

  const duration =
    typeof request.duration === "number"
      ? `${request.duration} minutes`
      : request.duration;

  const initials = requester.name
    ? requester.name.charAt(0).toUpperCase()
    : "P";

  return (
    <div className="min-h-screen bg-[#f8f8fc] text-slate-900">

      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1200px] items-center justify-between px-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Sparkles size={17} />
            </div>

            <span className="text-xl font-extrabold tracking-[-0.04em]">
              Peerly
            </span>
          </Link>

          <Link
            to={isOwner ? "/my-requests" : "/find-help"}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />

            {isOwner
              ? "Back to My Requests"
              : "Back to requests"}
          </Link>
        </div>
      </header>

      {/* -------------------------------- */}
      {/* Main */}
      {/* -------------------------------- */}

      <main className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 lg:py-12">

        {/* Breadcrumb */}

        <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link
            to="/find-help"
            className="hover:text-violet-600"
          >
            Find Help
          </Link>

          <span>/</span>

          <span>{request.category}</span>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* -------------------------------- */}
          {/* Main Request Card */}
          {/* -------------------------------- */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {/* User */}

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                {initials}
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Posted by
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {isOwner
                    ? "You"
                    : requester.name || "Anonymous peer"}
                </p>
              </div>
            </div>

            {/* Title */}

            <div className="mt-7">

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                  {request.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    statusStyles[request.status] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {formatStatus(request.status)}
                </span>

                {isOwner && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    Your Request
                  </span>
                )}

                {isHelper && (
                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                    You're Helping
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">
                {request.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">

                <span className="flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {duration}
                </span>

                <span className="flex items-center gap-1.5">
                  <Wallet size={15} />
                  {request.points} PeerPoints
                </span>

              </div>
            </div>

            {/* Description */}

            <div className="mt-8 border-t border-slate-100 pt-7">

              <h2 className="text-base font-bold text-slate-950">
                What do they need help with?
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-500">
                {request.description}
              </p>

            </div>

            {/* Attachments */}

            <div className="mt-8 border-t border-slate-100 pt-7">

              <h2 className="text-base font-bold text-slate-950">
                Attachments
              </h2>

              {request.attachments &&
              request.attachments.length > 0 ? (
                <div className="mt-3 space-y-3">

                  {request.attachments.map(
                    (attachment, index) => (
                      <a
                        key={index}
                        href={attachment}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-violet-700 hover:bg-violet-50"
                      >
                        <FileText size={18} />
                        Attachment {index + 1}
                      </a>
                    )
                  )}

                </div>
              ) : (
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-400">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      No attachments
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      The requester has not attached any files.
                    </p>
                  </div>

                </div>
              )}

            </div>

          </section>

          {/* -------------------------------- */}
          {/* Right Sidebar */}
          {/* -------------------------------- */}

          <aside className="space-y-5">

            {/* Owner / Helper Card */}

            {isOwner ? (

              <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <FileText
                    size={19}
                    className="text-violet-300"
                  />
                </div>

                <h2 className="mt-5 text-2xl font-semibold">
                  Your request
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  This request was posted by you.
                  Other students can find it and accept
                  it to help you.
                </p>

                <Link
                  to="/my-requests"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                >
                  View My Requests
                  <ArrowRight size={16} />
                </Link>

              </div>

            ) : (

              <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Heart
                    size={19}
                    className="text-violet-300"
                  />
                </div>

                <h2 className="mt-5 text-2xl font-semibold">
                  {isHelper
                    ? "You're helping!"
                    : "Can you help with this?"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {isHelper
                    ? "This request is assigned to you. You can continue the task in the private workspace."
                    : "Accept this request to start helping the requester."}
                </p>

                {isOpen ? (

                  <button
                    onClick={handleAccept}
                    disabled={accepting}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {accepting
                      ? "Accepting..."
                      : "Accept request"}

                    {!accepting && (
                      <ArrowRight size={16} />
                    )}
                  </button>

                ) : (

                  <div className="mt-6 rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-300">
                    {formatStatus(request.status)}
                  </div>

                )}

              </div>

            )}

            {/* -------------------------------- */}
            {/* PRIVATE WORKSPACE */}
            {/* -------------------------------- */}

            {canOpenWorkspace && (
              <div className="rounded-3xl border border-violet-200 bg-violet-50 p-5 shadow-sm">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                    <MessageSquare size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Private Workspace
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Chat privately, share files and
                      collaborate with your peer.
                    </p>
                  </div>

                </div>

                <Link
                  to={`/workspace/${request._id}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                >
                  Open Private Workspace
                  <ArrowRight size={16} />
                </Link>

              </div>
            )}

            {/* -------------------------------- */}
            {/* Reward Card */}
            {/* -------------------------------- */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Wallet size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    {isOwner
                      ? "Estimated reward"
                      : "You'll earn"}
                  </p>

                  <p className="text-lg font-bold text-slate-950">
                    {request.points} PeerPoints
                  </p>

                </div>

              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                PeerPoints are released after the
                requester confirms the task is completed.
              </p>

            </div>

            {/* -------------------------------- */}
            {/* Safety Card */}
            {/* -------------------------------- */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <User size={16} />
                </div>

                <div>

                  <p className="text-sm font-bold text-slate-900">
                    Private workspace
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Detailed communication and shared
                    files are available after acceptance.
                  </p>

                </div>

              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                <MessageSquare size={14} />
                {canOpenWorkspace
                  ? "Private chat is available"
                  : "Chat opens after acceptance"}
              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default RequestDetails;