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
  User,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Signup failed.");
      return;
    }

    alert("Account created successfully! 🎉");

    navigate("/login");
  } catch (error) {
    console.error("Signup error:", error);
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

        <div className="grid w-full max-w-[1050px] overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.82fr_1.18fr]">

          {/* Left */}
          <div className="hidden bg-violet-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Sparkles size={21} />
              </div>

              <h1 className="mt-10 max-w-[350px] font-serif text-[3rem] font-semibold leading-[1.05] tracking-[-0.04em]">
                Your campus
                <br />
                is full of
                <br />
                <span className="text-violet-100">
                  possibilities.
                </span>
              </h1>

              <p className="mt-6 max-w-[360px] text-sm leading-6 text-violet-100">
                Join a community where students help each other, exchange
                skills and turn their time into something valuable.
              </p>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-sm text-violet-100">
                One account.
                <br />
                <span className="font-semibold text-white">
                  A whole community of possibilities.
                </span>
              </p>
            </div>

          </div>

          {/* Signup form */}
          <div className="p-7 sm:p-10 lg:p-12">

            <div className="mx-auto max-w-[470px]">

              <div className="lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Sparkles size={18} />
                </div>
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-violet-600">
                Join Peerly
              </p>

              <h2 className="mt-3 font-serif text-[2.7rem] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950">
                Create your account
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Start exchanging skills with students around you.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

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
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Password
                  </label>

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
                      placeholder="Create a password"
                      required
                      minLength={6}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      minLength={6}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-violet-600"
                  />

                  <span className="text-xs leading-5 text-slate-500">
                    I agree to Peerly's Terms of Service and Privacy Policy.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Create account

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-violet-600 hover:text-violet-700"
                >
                  Log in
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Signup;