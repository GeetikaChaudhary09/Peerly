import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed.");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful! 🎉");

    navigate("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    alert("Unable to connect to Peerly server.");
  }
};

  return (
    <main className="min-h-screen bg-[#fcfbff]">

      {/* Top navigation */}
      <div className="absolute left-0 right-0 top-0">
        <div className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between px-8 lg:px-12">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Sparkles size={18} />
            </div>

            <span className="text-[21px] font-extrabold tracking-[-0.04em] text-slate-950">
              Peerly
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

        </div>
      </div>

      {/* Content */}
      <div className="flex min-h-screen items-center justify-center px-6 pb-12 pt-28">

        <div className="grid w-full max-w-[1050px] overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left panel */}
          <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles size={21} className="text-violet-300" />
              </div>

              <h1 className="mt-10 max-w-[350px] font-serif text-[3rem] font-semibold leading-[1.05] tracking-[-0.04em]">
                Welcome back
                <br />
                to your
                <br />
                <span className="text-violet-300">
                  campus community.
                </span>
              </h1>

              <p className="mt-6 max-w-[360px] text-sm leading-6 text-slate-400">
                Pick up where you left off. Find help, share your skills,
                and keep building your PeerPoints.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="font-serif text-lg italic text-slate-400">
                Your skills. Their need.
                <br />
                <span className="text-white">
                  One community.
                </span>
              </p>
            </div>

          </div>

          {/* Login form */}
          <div className="p-7 sm:p-10 lg:p-12">

            <div className="mx-auto max-w-[430px]">

              <div className="lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Sparkles size={18} />
                </div>
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-violet-600">
                Welcome back
              </p>

              <h2 className="mt-3 font-serif text-[2.7rem] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950">
                Log in to Peerly
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Continue helping, learning and earning PeerPoints.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    College email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@college.edu"
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-slate-800">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 accent-violet-600"
                  />

                  <span className="text-sm text-slate-500">
                    Remember me
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Log in

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Signup */}
              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-violet-600 hover:text-violet-700"
                >
                  Create one
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Login;