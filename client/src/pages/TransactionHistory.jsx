
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Clock,
  History,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch transactions");
        }

        setTransactions(data.transactions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalEarned = useMemo(
    () =>
      transactions
        .filter((item) => item.type === "earned")
        .reduce((sum, item) => sum + item.points, 0),
    [transactions]
  );

  const totalSpent = useMemo(
    () =>
      transactions
        .filter((item) => item.type === "spent")
        .reduce((sum, item) => sum + item.points, 0),
    [transactions]
  );

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-[#f8f8fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="text-violet-600" size={20} />
            Peerly
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div>
          <p className="text-sm font-semibold text-violet-600">
            YOUR WALLET
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Transaction History
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track your earned and spent PeerPoints.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Earned
              </p>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <ArrowDownLeft size={20} />
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-emerald-600">
              +{totalEarned} pts
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Points received from helping peers
            </p>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Spent
              </p>
              <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                <ArrowUpRight size={20} />
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-rose-600">
              -{totalSpent} pts
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Points used to receive help
            </p>
          </div>
        </div>

        <section className="mt-9 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-6">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
              <History size={20} />
            </div>

            <div>
              <h2 className="font-bold">Recent Transactions</h2>
              <p className="mt-1 text-xs text-slate-400">
                Your latest PeerPoints activity
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16 text-violet-600">
              <Loader2 className="animate-spin" size={28} />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center py-16 text-center">
              <AlertCircle className="text-red-500" size={30} />
              <p className="mt-3 font-semibold">Something went wrong</p>
              <p className="mt-1 text-sm text-slate-500">{error}</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Wallet size={35} className="text-slate-300" />
              <h3 className="mt-4 font-semibold">No transactions yet</h3>
              <p className="mt-1 text-sm text-slate-400">
                Your PeerPoints activity will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {transactions.map((item) => {
                const earned = item.type === "earned";

                return (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        earned
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {earned ? (
                        <ArrowDownLeft size={21} />
                      ) : (
                        <ArrowUpRight size={21} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>

                      <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={12} />
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p
                        className={`text-lg font-bold ${
                          earned ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {earned ? "+" : "-"}{item.points} pts
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          earned
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {earned ? "Earned" : "Spent"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TransactionHistory;
