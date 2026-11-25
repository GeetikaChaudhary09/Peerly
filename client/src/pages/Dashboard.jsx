import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  History,
  Bell,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { io } from "socket.io-client";

const recommendedRequests = [
  {
    title: "Help with Java OOP",
    category: "Java & DSA",
    duration: "30 min",
    points: "30 pts",
    initials: "R",
    avatar: "bg-violet-100 text-violet-700",
  },
  {
    title: "DBMS Normalization Doubt",
    category: "DBMS & SQL",
    duration: "20 min",
    points: "20 pts",
    initials: "A",
    avatar: "bg-blue-100 text-blue-700",
  },
  {
    title: "Need help with React UI",
    category: "Web Development",
    duration: "45 min",
    points: "45 pts",
    initials: "S",
    avatar: "bg-amber-100 text-amber-700",
  },
];

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
  label: "Find Help",
  icon: Search,
  path: "/find-help",
},
  {
    label: "My Requests",
    icon: BookOpen,
    path: "/my-requests",
  },
  {
    label: "My Tasks",
    icon: CheckCircle2,
    path: "/my-tasks",
  },
  {
  label: "Transaction History",
  icon: History,
  path: "/transactions",
  },
  {
  label: "Notifications",
  icon: Bell,
  path: "/notifications",
},
  {
    label: "AI Assistant",
    icon: Bot,
  },
  {
    label: "Rewards",
    icon: GiftIcon,
  },
  {
    label: "Leaderboard",
    icon: Trophy,
  },
];

function GiftIcon(props) {
  return <Zap {...props} />;
}

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Get logged-in user from localStorage
  const [user, setUser] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
});

useEffect(() => {
  const fetchLatestProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch profile");
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Profile fetch error:", error.message);
    }
  };

  fetchLatestProfile();
}, []);


useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Notification count error:", error);
    }
  };

  fetchUnreadCount();

  const socket = io("http://localhost:5000", {
    auth: { token },
  });

  socket.on("new-notification", () => {
    setUnreadCount((count) => count + 1);
  });

  return () => {
    socket.disconnect();
  };
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f8fc] text-slate-900">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[255px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Logo */}
        <div className="flex h-[78px] items-center justify-between border-b border-slate-100 px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Sparkles size={17} />
            </div>

            <span className="text-xl font-extrabold tracking-[-0.04em]">
              Peerly
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </p>

          <nav className="mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                   key={item.label}
  onClick={() => {
    setSidebarOpen(false);

    if (item.path) {
      navigate(item.path);
    }
  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    item.active
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                 <Icon size={18} />

<span className="flex-1 text-left">
  {item.label}
</span>

{item.label === "Notifications" && unreadCount > 0 && (
  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
    {unreadCount > 99 ? "99+" : unreadCount}
  </span>
)}
                </button>
              );
            })}
          </nav>

          <div className="my-7 h-px bg-slate-100" />

          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Account
          </p>

          <nav className="mt-3 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
              <User size={18} />
              My Profile
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
              <Settings size={18} />
              Settings
            </button>
          </nav>
        </div>

        {/* Bottom profile */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
              {user?.name?.charAt(0)?.toUpperCase() || "G"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user?.name || "Geetika"}
              </p>

              <p className="truncate text-xs text-slate-400">
                Student
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-slate-700"
            >
              <LogOut size={16} />
            </button>

          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-[255px]">

        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl sm:px-8">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-900">
              Your Peerly workspace
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Learn, help and grow together.
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">

            {/* Wallet */}
            <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold shadow-sm transition hover:border-slate-300 sm:flex">
              <Wallet size={17} className="text-violet-600" />

              <span>
                {user?.peerPoints ?? 100} pts
              </span>
            </button>
            <button
  onClick={() => navigate("/notifications")}
  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
  title="Notifications"
>
  <Bell size={18} />

  {unreadCount > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  )}
</button>

            {/* Profile */}
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2.5 transition hover:border-slate-300"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700">
                  {user?.name?.charAt(0)?.toUpperCase() || "G"}
                </div>

                <ChevronDown size={15} className="text-slate-400" />

              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                    <User size={16} />
                    Profile
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                    <Settings size={16} />
                    Settings
                  </button>

                  <div className="my-1 h-px bg-slate-100" />

                  {/* Top-right Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>

                </div>
              )}

            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">

          {/* Greeting */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-sm font-medium text-violet-600">
                Sunday, September 6
              </p>

              <h1 className="mt-2 font-serif text-[2.5rem] font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-[3rem]">
                Good afternoon, {user?.name || "Geetika"}.
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                What can we help you with today?
              </p>

            </div>

            <button
              onClick={() => navigate("/create-request")}
              className="group flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <Plus size={17} />

              Post a request

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

          </div>

          {/* Quick actions */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <button
              onClick={() => navigate("/find-help")}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Search size={20} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600"
                />

              </div>

              <h3 className="mt-5 text-base font-bold text-slate-950">
                Find someone to help
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Browse requests and find a peer who can help you.
              </p>

            </button>

            <button
              onClick={() => navigate("/find-help")}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Heart size={20} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                />

              </div>

              <h3 className="mt-5 text-base font-bold text-slate-950">
                Start helping someone
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Share your skills and earn PeerPoints by helping others.
              </p>

            </button>

          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">

            {/* PeerPoints */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-xs font-medium text-slate-400">
                  PeerPoints
                </p>

                <Wallet size={17} className="text-violet-500" />

              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {user?.peerPoints ?? 100}
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                Available to use
              </p>

            </div>

            {/* Tasks */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-xs font-medium text-slate-400">
                  Tasks helped
                </p>

                <CheckCircle2 size={17} className="text-emerald-500" />

              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {user?.tasksCompleted ?? 0}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Completed exchanges
              </p>

            </div>

            {/* Rating */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-xs font-medium text-slate-400">
                  Rating
                </p>

                <Star size={17} className="fill-amber-400 text-amber-400" />

              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {user?.rating ?? 0}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                From your peers
              </p>

            </div>

            {/* Streak */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-xs font-medium text-slate-400">
                  Helping streak
                </p>

                <Zap size={17} className="text-amber-500" />

              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {user?.streak ?? 0} days
              </p>

              <p className="mt-1 text-xs text-violet-600">
                Keep it going!
              </p>

            </div>

          </div>

          {/* Main grid */}
          <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_340px]">

            {/* Recommended */}
            <section>

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-bold text-slate-950">
                    Recommended for you
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Requests that match your interests.
                  </p>

                </div>

                <button
                  onClick={() => navigate("/find-help")}
                  className="hidden items-center gap-1 text-sm font-semibold text-violet-600 sm:flex"
                >
                  View all
                  <ArrowRight size={15} />
                </button>

              </div>

              <div className="mt-4 space-y-3">

                {recommendedRequests.map((request) => (
                  <div
                    key={request.title}
                    className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:flex-row sm:items-center"
                  >

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${request.avatar}`}
                    >
                      {request.initials}
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-slate-950">
                        {request.title}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">

                        <span>{request.category}</span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={12} />
                          {request.duration}
                        </span>

                      </div>

                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">

                      <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                        {request.points}
                      </span>

                      <button className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                        View
                      </button>

                    </div>

                  </div>
                ))}

              </div>

              <button
              onClick={() => navigate("/find-help")}
              className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 sm:hidden"
            >
                View all requests
                <ArrowRight size={15} />
              </button>

            </section>

            {/* Right column */}
            <aside className="space-y-5">

              {/* AI card */}
              <div className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Bot size={19} className="text-violet-300" />
                </div>

                <h3 className="mt-5 font-serif text-2xl leading-tight">
                  Need help finding the right peer?
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Tell Peerly AI what you're working on and we'll help you
                  turn it into a request.
                </p>

                <button className="mt-5 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                  Ask Peerly AI
                  <ArrowRight size={15} />
                </button>

              </div>

              {/* Profile progress */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-slate-950">
                      Complete your profile
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Help peers know what you can offer.
                    </p>

                  </div>

                  <span className="text-sm font-bold text-violet-600">
                    70%
                  </span>

                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[70%] rounded-full bg-violet-600" />
                </div>

                <button className="mt-5 flex items-center gap-1 text-xs font-semibold text-slate-700">
                  Complete profile
                  <ArrowRight size={14} />
                </button>

              </div>

              {/* Community */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <Users size={18} />
                  </div>

                  <div>

                    <h3 className="text-sm font-bold text-slate-950">
                      Your community
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Keep sharing what you know.
                    </p>

                  </div>

                </div>

                <div className="mt-5 flex items-center gap-3">

                  <div className="flex -space-x-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-[10px] font-bold text-violet-700">
                      A
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-[10px] font-bold text-blue-700">
                      R
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-[10px] font-bold text-amber-700">
                      S
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-[10px] font-bold text-emerald-700">
                      +
                    </div>

                  </div>

                  <span className="text-xs text-slate-400">
                    Your peers are learning too.
                  </span>

                </div>

              </div>

            </aside>
          </div>

          {/* Bottom banner */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-violet-100 bg-violet-50 p-6 sm:p-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                  <GraduationCap size={20} />
                </div>

                <div>

                  <p className="font-semibold text-slate-950">
                    Your skills can take you further.
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Add your skills to your profile and let the right requests
                    find you.
                  </p>

                </div>

              </div>

              <button className="flex shrink-0 items-center gap-2 text-sm font-semibold text-violet-700">
                Add your skills
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;