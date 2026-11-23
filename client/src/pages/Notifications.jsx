
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  Bell,
  MessageSquare,
  FileText,
  CheckCircle2,
  Coins,
  Clock,
  Trash2,
  Check,
  ArrowLeft,
  Inbox,
  RefreshCw,
} from "lucide-react";

const API = "http://localhost:5000/api/notifications";

const iconMap = {
  "new-request": FileText,
  "request-accepted": CheckCircle2,
  "new-message": MessageSquare,
  "file-uploaded": FileText,
  "task-started": Clock,
  "completion-requested": Clock,
  "task-completed": CheckCircle2,
  "points-earned": Coins,
};

const colorMap = {
  "new-request": "bg-blue-50 text-blue-600",
  "request-accepted": "bg-violet-50 text-violet-600",
  "new-message": "bg-indigo-50 text-indigo-600",
  "file-uploaded": "bg-amber-50 text-amber-600",
  "task-started": "bg-sky-50 text-sky-600",
  "completion-requested": "bg-orange-50 text-orange-600",
  "task-completed": "bg-emerald-50 text-emerald-600",
  "points-earned": "bg-yellow-50 text-yellow-600",
};

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      setError("");

      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load notifications");
      }

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  if (!token) {
    navigate("/login");
    return;
  }

  let isMounted = true;

  const loadNotifications = async () => {
    try {
      setError("");

      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load notifications");
      }

      if (isMounted) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  loadNotifications();

  const socket = io("http://localhost:5000", {
    auth: { token },
  });

  socket.on("new-notification", (notification) => {
    setNotifications((previous) => {
      if (previous.some((item) => item._id === notification._id)) {
        return previous;
      }

      return [notification, ...previous];
    });

    setUnreadCount((count) => count + 1);
  });

  return () => {
    isMounted = false;
    socket.disconnect();
  };
}, [token, navigate]);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`${API}/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to mark notification as read");
      }

      setNotifications((previous) =>
        previous.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );

      setUnreadCount((count) => Math.max(0, count - 1));
    } catch (err) {
      console.error(err.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch(`${API}/read-all`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to mark all as read");
      }

      setNotifications((previous) =>
        previous.map((item) => ({ ...item, isRead: true }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const notification = notifications.find((item) => item._id === id);

      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to delete notification");
      }

      setNotifications((previous) =>
        previous.filter((item) => item._id !== id)
      );

      if (notification && !notification.isRead) {
        setUnreadCount((count) => Math.max(0, count - 1));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }

    if (notification.link) {
      navigate(notification.link);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((item) => !item.isRead)
      : notifications;

  return (
    <div className="min-h-screen bg-[#f8f8fc] px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <Bell size={23} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                  Notifications
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Stay updated with everything happening on Peerly.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={fetchNotifications}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        {/* Summary */}
        <div className="mt-7 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500">Unread notifications</p>
            <p className="mt-1 text-3xl font-bold text-slate-950">
              {unreadCount}
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Check size={16} />
            Mark all as read
          </button>
        </div>

        {/* Filters */}
        <div className="mt-7 flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setFilter("all")}
            className={`border-b-2 px-4 py-3 text-sm font-semibold ${
              filter === "all"
                ? "border-violet-600 text-violet-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            All
            <span className="ml-2 text-xs">{notifications.length}</span>
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={`border-b-2 px-4 py-3 text-sm font-semibold ${
              filter === "unread"
                ? "border-violet-600 text-violet-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Unread
            <span className="ml-2 text-xs">{unreadCount}</span>
          </button>
        </div>

        {/* Notifications list */}
        <div className="mt-5 space-y-3">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={fetchNotifications}
                className="mt-4 text-sm font-semibold text-violet-600"
              >
                Try again
              </button>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Inbox size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {filter === "unread"
                  ? "You're all caught up!"
                  : "No notifications yet"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {filter === "unread"
                  ? "You have no unread notifications."
                  : "Your Peerly updates will appear here."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => {
              const Icon = iconMap[item.type] || Bell;
              const iconColor =
                colorMap[item.type] || "bg-slate-100 text-slate-600";

              return (
                <div
                  key={item._id}
                  className={`group flex gap-4 rounded-2xl border p-4 transition hover:shadow-sm sm:p-5 ${
                    item.isRead
                      ? "border-slate-200 bg-white"
                      : "border-violet-200 bg-violet-50/40"
                  }`}
                >
                  <button
                    onClick={() => handleNotificationClick(item)}
                    className="flex min-w-0 flex-1 gap-4 text-left"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconColor}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {item.title}
                        </h3>

                        {!item.isRead && (
                          <span className="h-2 w-2 rounded-full bg-violet-600" />
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.message}
                      </p>

                      {item.request?.title && (
                        <p className="mt-1 text-xs font-medium text-violet-600">
                          {item.request.title}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-slate-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </button>

                  <div className="flex shrink-0 flex-col items-center gap-2">
                    {!item.isRead && (
                      <button
                        onClick={() => markAsRead(item._id)}
                        title="Mark as read"
                        className="rounded-lg p-2 text-slate-400 hover:bg-violet-100 hover:text-violet-700"
                      >
                        <Check size={17} />
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(item._id)}
                      title="Delete notification"
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <p className="py-8 text-center text-xs text-slate-400">
          Peerly keeps you connected with your community.
        </p>
      </div>
    </div>
  );
}

export default Notifications;
