import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Coins,
  User,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/requests/my-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load tasks");
        }

        setTasks(data.tasks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={35} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold text-sm">
            YOUR WORK
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            My Tasks
          </h1>

          <p className="text-gray-500 mt-2">
            Requests you've accepted and are helping with.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && tasks.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
            <CheckCircle
              size={48}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl font-bold text-gray-900 mt-5">
              No tasks yet
            </h2>

            <p className="text-gray-500 mt-2">
              Accept a request from Find Help and it will appear here.
            </p>

            <Link
              to="/find-help"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Find Someone to Help
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* Tasks */}
        {tasks.length > 0 && (
          <div className="grid gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                  {/* Main Info */}
                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                        {task.category}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold capitalize">
                        {task.status}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900">
                      {task.title}
                    </h2>

                    <p className="text-gray-500 mt-2 leading-relaxed">
                      {task.description}
                    </p>

                    {/* Requester */}
                    <div className="flex items-center gap-2 mt-5 text-sm text-gray-600">
                      <User size={17} className="text-indigo-500" />

                      <span>
                        Helping{" "}
                        <strong className="text-gray-800">
                          {task.requester?.name || "Student"}
                        </strong>
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-500">

                      <span className="flex items-center gap-2">
                        <Clock size={17} />
                        {task.duration}
                      </span>

                      <span className="flex items-center gap-2">
                        <Coins size={17} />
                        {task.points} PeerPoints
                      </span>

                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex md:flex-col items-center gap-3">
                    <Link
                      to={`/workspace/${task._id}`}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition whitespace-nowrap"
                    >
                      Open Workspace
                      <ArrowRight size={17} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTasks;