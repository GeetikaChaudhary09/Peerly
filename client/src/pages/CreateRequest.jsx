import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  FileText,
  Sparkles,
  Wallet,
  Send,
} from "lucide-react";

const durationOptions = [
  { label: "10 minutes", value: "10 min", points: 10 },
  { label: "20 minutes", value: "20 min", points: 20 },
  { label: "30 minutes", value: "30 min", points: 30 },
  { label: "45 minutes", value: "45 min", points: 45 },
  { label: "1 hour", value: "1 hr", points: 60 },
  { label: "2 hours", value: "2 hr", points: 120 },
];

const categories = [
  "Java & DSA",
  "DBMS & SQL",
  "Web Development",
  "Design",
  "Other",
];

function CreateRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedDuration = durationOptions.find(
    (option) => option.value === formData.duration
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      !formData.duration
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            duration: formData.duration,
            points: selectedDuration.points,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create request.");
        return;
      }

      alert("Your request has been posted successfully! 🎉");

      navigate("/find-help");
    } catch (err) {
      console.error("Create request error:", err);
      setError("Unable to connect to Peerly server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8fc] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
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
      <main className="mx-auto max-w-[850px] px-5 py-8 sm:px-8 lg:py-12">
        <Link
          to="/find-help"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
        >
          <ArrowLeft size={16} />
          Back to requests
        </Link>

        {/* Heading */}
        <div className="mt-8">
          <p className="text-sm font-medium text-violet-600">
            Peerly Marketplace
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Ask your peers for help.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Tell the community what you need help with. Someone with the
            right skills might be able to help you out.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="text-sm font-bold text-slate-900"
            >
              Request title <span className="text-red-500">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              maxLength={100}
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Need help understanding Java inheritance"
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              required
            />

            <p className="mt-2 text-right text-xs text-slate-400">
              {formData.title.length}/100
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-bold text-slate-900"
            >
              Describe what you need help with{" "}
              <span className="text-red-500">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows={6}
              maxLength={2000}
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain what you're working on, what you've tried, and where you're getting stuck..."
              className="mt-3 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              required
            />

            <p className="mt-2 text-right text-xs text-slate-400">
              {formData.description.length}/2000
            </p>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="text-sm font-bold text-slate-900"
            >
              Choose a category <span className="text-red-500">*</span>
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              required
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-bold text-slate-900">
              Estimated time <span className="text-red-500">*</span>
            </label>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Choose how much time you think the task will take.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {durationOptions.map((option) => {
                const isSelected =
                  formData.duration === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        duration: option.value,
                      }))
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-violet-500 bg-violet-50 ring-2 ring-violet-100"
                        : "border-slate-200 bg-white hover:border-violet-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={16}
                        className={
                          isSelected
                            ? "text-violet-600"
                            : "text-slate-400"
                        }
                      />

                      <span className="text-sm font-bold text-slate-900">
                        {option.label}
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-semibold text-violet-600">
                      {option.points} PeerPoints
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Points preview */}
          <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600">
                <Wallet size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  PeerPoints estimate
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The helper will earn points after the task is completed
                  and confirmed.
                </p>

                <p className="mt-3 text-2xl font-bold text-violet-700">
                  {selectedDuration
                    ? `${selectedDuration.points} PeerPoints`
                    : "Select a duration"}
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "Posting request..."
            ) : (
              <>
                <Send size={16} />
                Post request
              </>
            )}
          </button>

          <p className="text-center text-xs leading-5 text-slate-400">
            By posting, your request will be visible to other Peerly
            students.
          </p>
        </form>

        {/* Info */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
          <FileText
            size={18}
            className="mt-0.5 shrink-0 text-violet-600"
          />

          <p className="text-xs leading-6 text-slate-500">
            Keep your request clear and specific so that other students
            can understand how they can help you.
          </p>
        </div>
      </main>
    </div>
  );
}

export default CreateRequest;