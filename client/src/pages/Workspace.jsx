import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Lock,
  CalendarDays,
  Send,
  Paperclip,
   FileText,
} from "lucide-react";
import { io } from "socket.io-client";

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);
  const [socketStatus, setSocketStatus] =
    useState("connecting");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] =
    useState(true);
  const [uploadingFile, setUploadingFile] =
    useState(false);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // =====================================
  // FETCH WORKSPACE + MESSAGE HISTORY
  // + SOCKET CONNECTION
  // =====================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // =====================================
    // FETCH WORKSPACE
    // =====================================

    const fetchWorkspace = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/requests/${id}/workspace`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load workspace"
          );
        }

        setWorkspace(data.workspace);
      } catch (error) {
        console.error(
          "Workspace error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    // =====================================
    // FETCH MESSAGE HISTORY
    // =====================================

    const fetchMessages = async () => {
      try {
        setMessagesLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/messages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load messages"
          );
        }

        setMessages(data.messages || []);

      } catch (error) {
        console.error(
          "Message history error:",
          error
        );
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchWorkspace();
    fetchMessages();

    // =====================================
    // CONNECT SOCKET
    // =====================================

    const newSocket = io(
      "http://localhost:5000",
      {
        auth: {
          token,
        },
      }
    );

    socketRef.current = newSocket;

    // =====================================
    // SOCKET CONNECTED
    // =====================================

    newSocket.on("connect", () => {
      console.log(
        "🔌 Connected to Peerly Socket.IO"
      );

      setSocketStatus("connected");

      // Join current workspace
      newSocket.emit(
        "join-workspace",
        id,
        (response) => {
          if (response?.success) {
            console.log(
              "🔒 Joined private workspace"
            );
          } else {
            console.error(
              "Workspace join rejected:",
              response?.message
            );

            setSocketStatus(
              "unauthorized"
            );
          }
        }
      );
    });

    // =====================================
    // RECEIVE NEW MESSAGE
    // =====================================

    newSocket.on(
      "new-message",
      (newMessage) => {
        console.log(
          "💬 New message:",
          newMessage
        );

        setMessages(
          (previousMessages) => {

            // Prevent duplicate messages
            const alreadyExists =
              previousMessages.some(
                (item) =>
                  item._id ===
                  newMessage._id
              );

            if (alreadyExists) {
              return previousMessages;
            }

            return [
              ...previousMessages,
              newMessage,
            ];
          }
        );
      }
    );

    // =====================================
    // CONNECTION ERROR
    // =====================================

    newSocket.on(
      "connect_error",
      (error) => {
        console.error(
          "Socket connection error:",
          error.message
        );

        setSocketStatus("error");
      }
    );

    // =====================================
    // DISCONNECTED
    // =====================================

    newSocket.on(
      "disconnect",
      () => {
        console.log(
          "❌ Disconnected from Socket.IO"
        );

        setSocketStatus(
          "disconnected"
        );
      }
    );

    // =====================================
    // CLEANUP
    // =====================================

    return () => {
      newSocket.emit(
        "leave-workspace",
        id
      );

      newSocket.disconnect();
      socketRef.current = null;
    };
  }, [id, navigate]);

  // =====================================
  // AUTO SCROLL
  // =====================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================
  // SOCKET STATUS
  // =====================================

  const getSocketStatus = () => {
    if (socketStatus === "connected") {
      return {
        text: "Connected",
        className:
          "text-emerald-600",
      };
    }

    if (
      socketStatus ===
      "unauthorized"
    ) {
      return {
        text: "Access denied",
        className:
          "text-red-600",
      };
    }

    if (socketStatus === "error") {
      return {
        text: "Connection error",
        className:
          "text-red-600",
      };
    }

    if (
      socketStatus ===
      "disconnected"
    ) {
      return {
        text: "Disconnected",
        className:
          "text-gray-500",
      };
    }

    return {
      text: "Connecting...",
      className:
        "text-amber-600",
    };
  };

  const socketInfo =
    getSocketStatus();

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-gray-500">
          Loading workspace...
        </div>
      </div>
    );
  }

  // =====================================
  // WORKSPACE NOT FOUND
  // =====================================

  if (!workspace) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-xl font-semibold text-gray-900">
            Workspace not found
          </h2>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="mt-4 px-5 py-2 bg-black text-white rounded-lg"
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // =====================================
  // CURRENT USER
  // =====================================

  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  const currentUserId =
    user._id ||
    user.id ||
    user.userId;

  // =====================================
  // HELPER CHECK
  // =====================================

  const helperId =
    workspace.helper?._id ||
    workspace.helper?.id;

  const isHelper =
    currentUserId &&
    helperId &&
    currentUserId.toString() ===
      helperId.toString();

  const requesterId =
  workspace.requester?._id ||
  workspace.requester?.id;

const isRequester =
  currentUserId &&
  requesterId &&
  currentUserId.toString() ===
    requesterId.toString();
  // =====================================
  // STATUS
  // =====================================

  // =====================================
  // FORMAT STATUS
  // =====================================

  const formatStatus = (status) => {
    if (!status) {
      return "Unknown";
    }

    return status
      .split("-")
      .map(
        (word) =>
          word
            .charAt(0)
            .toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  // =====================================
  // START TASK
  // =====================================

  const handleStartTask =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/requests/${id}/start`,
            {
              method: "PATCH",
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message ||
              "Unable to start task"
          );
        }

        setWorkspace(
          (previous) => ({
            ...previous,
            status:
              data.request.status,
          })
        );

      } catch (error) {

        console.error(
          "Start task error:",
          error
        );

        alert(
          error.message
        );
      }
    };



// =====================================
// REQUEST COMPLETION
// =====================================

const handleRequestCompletion = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:5000/api/requests/${id}/request-completion`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Unable to request completion"
      );
    }

    setWorkspace((previous) => ({
      ...previous,
      status: data.request.status,
    }));

  } catch (error) {
    console.error(
      "Request completion error:",
      error
    );

    alert(error.message);
  }
};


// =====================================
// CONFIRM COMPLETION
// =====================================

const handleConfirmCompletion = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:5000/api/requests/${id}/confirm-completion`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Unable to confirm completion"
      );
    }

    setWorkspace((previous) => ({
      ...previous,
      status: data.request.status,
      completedAt:
        data.request.completedAt,
    }));

  } catch (error) {
    console.error(
      "Confirm completion error:",
      error
    );

    alert(error.message);
  }
};

  // =====================================
  // SEND MESSAGE
  // =====================================

  const handleSendMessage =
    () => {

      if (!message.trim()) {
        return;
      }

      const activeSocket = socketRef.current;

if (!activeSocket || !activeSocket.connected) {
    alert("Not connected to workspace.");
    return;
}

      activeSocket.emit("send-message", {
          requestId: id,
          message:
            message.trim(),
        },
        (response) => {

          console.log(
            "📥 Server response:",
            response
          );

          if (!response?.success) {

            console.error(
              "❌ Message send failed:",
              response?.message
            );

            alert(
              response?.message ||
                "Unable to send message"
            );

            return;
          }

          console.log(
            "✅ Message sent successfully"
          );

        }
      );

      setMessage("");
    };

  // =====================================
// UPLOAD FILE
// =====================================

const handleFileUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  const maxSize = 10 * 1024 * 1024;

  if (file.size > maxSize) {
    alert("File size must be less than 10 MB.");
    event.target.value = "";
    return;
  }

  try {
    setUploadingFile(true);

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      `http://localhost:5000/api/messages/${id}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to upload file"
      );
    }

    // Add uploaded file to current chat
    if (data.data) {
      setMessages((previousMessages) => {
        const alreadyExists = previousMessages.some(
          (item) => item._id === data.data._id
        );

        if (alreadyExists) {
          return previousMessages;
        }

        return [...previousMessages, data.data];
      });
    }

    // Reset file input
    event.target.value = "";
  } catch (error) {
    console.error("File upload error:", error);

    alert(
      error.message || "Unable to upload file"
    );
  } finally {
    setUploadingFile(false);
  }
};

  // =====================================
  // FORMAT MESSAGE TIME
  // =====================================

  const formatMessageTime =
    (createdAt) => {

      if (!createdAt) {
        return "";
      }

      return new Date(
        createdAt
      ).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    };

  // =====================================
  // CHECK MESSAGE OWNER
  // =====================================

  const isMyMessage =
    (messageItem) => {

      const senderId =
        messageItem.sender?._id ||
        messageItem.sender?.id ||
        messageItem.sender;

      return (
        senderId?.toString() ===
        currentUserId?.toString()
      );
    };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==================================
          HEADER
      ================================== */}

      <div className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  navigate(-1)
                }
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft
                  size={20}
                />
              </button>

              <div>

                <p className="text-sm text-gray-500">
                  Private Peerly Workspace
                </p>

                <h1 className="text-xl font-bold text-gray-900">
                  {workspace.title}
                </h1>

              </div>

            </div>

            {/* SOCKET STATUS */}

            <div className="flex items-center gap-2 text-sm">

              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  socketStatus ===
                  "connected"
                    ? "bg-emerald-500"
                    : socketStatus ===
                          "error" ||
                      socketStatus ===
                          "unauthorized"
                    ? "bg-red-500"
                    : "bg-amber-500"
                }`}
              />

              <span
                className={
                  socketInfo.className
                }
              >
                {socketInfo.text}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ==================================
          MAIN
      ================================== */}

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ==================================
              LEFT
          ================================== */}

          <div className="lg:col-span-2 space-y-6">

            {/* ==================================
                TASK DETAILS
            ================================== */}

            <div className="bg-white rounded-2xl border border-gray-200 p-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-500 mb-1">
                    Task
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {workspace.title}
                  </h2>

                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium whitespace-nowrap">

                  <CheckCircle
                    size={16}
                  />

                  {formatStatus(
                    workspace.status
                  )}

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="mt-6">

                <p className="text-sm font-medium text-gray-700 mb-2">
                  Description
                </p>

                <p className="text-gray-600 leading-relaxed">
                  {workspace.description}
                </p>

              </div>

              {/* TASK INFO */}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                <div className="p-4 bg-slate-50 rounded-xl">

                  <p className="text-xs text-gray-500">
                    Category
                  </p>

                  <p className="font-semibold mt-1">
                    {workspace.category ||
                      "—"}
                  </p>

                </div>

                <div className="p-4 bg-slate-50 rounded-xl">

                  <p className="text-xs text-gray-500">
                    Duration
                  </p>

                  <p className="font-semibold mt-1">
                    {workspace.duration}
                  </p>

                </div>

                <div className="p-4 bg-slate-50 rounded-xl">

                  <p className="text-xs text-gray-500">
                    PeerPoints
                  </p>

                  <p className="font-semibold mt-1">
                    {workspace.points}
                  </p>

                </div>

              </div>

              {/* DATES */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">

                  <CalendarDays
                    size={18}
                    className="text-gray-400"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Created
                    </p>

                    <p className="text-sm font-medium text-gray-800">
                      {workspace.createdAt
                        ? new Date(
                            workspace.createdAt
                          ).toLocaleString()
                        : "—"}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">

                  <Clock
                    size={18}
                    className="text-gray-400"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Accepted
                    </p>

                    <p className="text-sm font-medium text-gray-800">
                      {workspace.acceptedAt
                        ? new Date(
                            workspace.acceptedAt
                          ).toLocaleString()
                        : "Not accepted yet"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================
                CHAT
            ================================== */}

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

              {/* CHAT HEADER */}

              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-gray-900">
                    Workspace Chat
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Private real-time communication
                  </p>

                </div>

                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-emerald-500" />

                  <Lock
                    size={17}
                    className="text-gray-400"
                  />

                </div>

              </div>

              {/* ==================================
                  MESSAGES
              ================================== */}

              <div className="h-80 overflow-y-auto p-5">

                {messagesLoading ? (

                  <div className="h-full flex items-center justify-center">

                    <p className="text-sm text-gray-500">
                      Loading conversation...
                    </p>

                  </div>

                ) : messages.length === 0 ? (

                  <div className="h-full flex items-center justify-center">

                    <div className="text-center">

                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center">

                        <Lock
                          size={22}
                          className="text-gray-400"
                        />

                      </div>

                      <p className="mt-4 font-medium text-gray-700">
                        No messages yet
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Start a conversation with{" "}
                        {isHelper
                          ? workspace.requester?.name
                          : workspace.helper?.name}
                      </p>

                    </div>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {messages.map(
                      (messageItem) => {

                        console.log("📎 MESSAGE DATA:", messageItem);
                        const mine =
                          isMyMessage(
                            messageItem
                          );

                        return (
                          <div
                            key={
                              messageItem._id
                            }
                            className={`flex ${
                              mine
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >

                            <div className="max-w-[75%]">

                              {/* OTHER USER NAME */}

                              {!mine && (
                                <p className="text-xs text-gray-500 mb-1 ml-1">
                                  {messageItem.sender
                                    ?.name ||
                                    "User"}
                                </p>
                              )}

                              {/* MESSAGE */}

<div
  className={`px-4 py-3 rounded-2xl shadow-sm ${
    mine
      ? "bg-black text-white rounded-br-md"
      : "bg-slate-100 text-gray-900 rounded-bl-md"
  }`}
>
  {messageItem.type === "image" ? (
    <a
      href={`http://localhost:5000${messageItem.fileUrl}`}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <img
        src={`http://localhost:5000${messageItem.fileUrl}`}
        alt={messageItem.fileName || "Uploaded image"}
        className="max-w-full max-h-64 rounded-xl object-contain"
      />

      <p className="mt-2 text-xs opacity-80 break-all">
        {messageItem.fileName}
      </p>
    </a>
  ) : messageItem.type === "file" ? (
    <a
      href={`http://localhost:5000${messageItem.fileUrl}`}
      target="_blank"
      rel="noreferrer"
      className="flex min-w-[230px] max-w-[300px] items-center gap-3 rounded-xl border border-white/20 p-3 transition hover:bg-white/10"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
        <FileText size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold break-all">
          {messageItem.fileName || "Attached file"}
        </p>

        <p className="mt-1 text-xs opacity-70">
          {messageItem.fileSize
            ? `${(messageItem.fileSize / 1024).toFixed(1)} KB`
            : "File"}
        </p>

        <p className="mt-1 text-xs font-medium opacity-80">
          Click to open
        </p>
      </div>
    </a>
  ) : (
    <p className="text-sm whitespace-pre-wrap break-words">
      {messageItem.message}
    </p>
  )}
</div>

                              {/* TIME */}

                              <p
                                className={`text-[11px] text-gray-400 mt-1 ${
                                  mine
                                    ? "text-right"
                                    : "text-left"
                                }`}
                              >
                                {formatMessageTime(
                                  messageItem.createdAt
                                )}
                              </p>

                            </div>

                          </div>
                        );
                      }
                    )}

                    <div
                      ref={
                        messagesEndRef
                      }
                    />

                  </div>

                )}

              </div>

              {/* ==================================
                  INPUT
              ================================== */}

              <div className="border-t border-gray-200 p-4">

                <div className="flex gap-3">
                    <input
  ref={fileInputRef}
  type="file"
  className="hidden"
  accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
  onChange={handleFileUpload}
/>

<button
  type="button"
  onClick={() =>
    fileInputRef.current?.click()
  }
  disabled={
    socketStatus !== "connected" ||
    uploadingFile
  }
  className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
  title="Attach file"
>
  <Paperclip size={18} />
</button>

                  <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                      setMessage(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {

                      if (
                        e.key ===
                        "Enter"
                      ) {

                        e.preventDefault();

                        handleSendMessage();

                      }

                    }}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black/10"
                  />

                  <button
                    onClick={
                      handleSendMessage
                    }
                    disabled={
                      socketStatus !==
                      "connected"
                    }
                    className="px-5 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >

                    <Send
                      size={17}
                    />

                    Send

                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================
              RIGHT SIDEBAR
          ================================== */}

          <div className="space-y-6">

            {/* PARTICIPANTS */}

            <div className="bg-white rounded-2xl border border-gray-200 p-6">

              <h3 className="font-semibold text-gray-900">
                People in this workspace
              </h3>

              <div className="mt-5 space-y-5">

                {/* REQUESTER */}

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-semibold">

                    {workspace.requester
                      ?.name
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "U"}

                  </div>

                  <div>

                    <p className="font-medium text-gray-900">
                      {
                        workspace
                          .requester
                          ?.name
                      }
                    </p>

                    <p className="text-xs text-gray-500">
                      Posted this request
                    </p>

                  </div>

                </div>

                {/* HELPER */}

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-gray-700">

                    {workspace.helper
                      ?.name
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "U"}

                  </div>

                  <div>

                    <p className="font-medium text-gray-900">
                      {
                        workspace
                          .helper
                          ?.name
                      }
                    </p>

                    <p className="text-xs text-gray-500">
                      Accepted this request
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================
    TASK CONTROLS
================================== */}

{isHelper && (

  <div className="bg-white rounded-2xl border border-gray-200 p-6">

    <h3 className="font-semibold text-gray-900">
      Task Controls
    </h3>

    {/* ACCEPTED */}
    {workspace.status === "accepted" && (

      <button
        onClick={handleStartTask}
        className="w-full mt-4 px-4 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
      >
        Start Task
      </button>

    )}

    {/* IN PROGRESS */}
    {workspace.status === "in-progress" && (

      <div className="mt-4">

        <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-4">

          <Clock size={17} />

          Task in Progress

        </div>

        <button
          onClick={handleRequestCompletion}
          className="w-full px-4 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
        >
          Request Completion
        </button>

      </div>

    )}

    {/* COMPLETION REQUESTED */}
    {workspace.status === "completion-requested" && (

      <div className="mt-4">

        <div className="flex items-center gap-2 text-amber-600 text-sm font-medium">

          <Clock size={17} />

          Completion Requested

        </div>

        <p className="text-xs text-gray-500 mt-2">
          Waiting for the requester to confirm
          the completed task.
        </p>

      </div>

    )}

    {/* COMPLETED */}
    {workspace.status === "completed" && (

      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">

        <CheckCircle size={17} />

        Task Completed

      </div>

    )}

  </div>

)}


{/* ==================================
    REQUESTER CONTROLS
================================== */}

{isRequester && (

  <div className="bg-white rounded-2xl border border-gray-200 p-6">

    <h3 className="font-semibold text-gray-900">
      Request Controls
    </h3>

    {workspace.status === "completion-requested" && (

      <div className="mt-4">

        <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-4">

          <Clock size={17} />

          Helper requested completion

        </div>

        <p className="text-sm text-gray-500 mb-4">
          Review the work in the workspace and
          confirm when the task has been completed.
        </p>

        <button
          onClick={handleConfirmCompletion}
          className="w-full px-4 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
        >
          Confirm Completion
        </button>

      </div>

    )}

    {workspace.status === "completed" && (

      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">

        <CheckCircle size={17} />

        Task Completed

      </div>

    )}

    {workspace.status !== "completion-requested" &&
      workspace.status !== "completed" && (

      <p className="mt-4 text-sm text-gray-500">
        The helper has not requested completion yet.
      </p>

    )}

  </div>

)} 

            {/* SECURITY */}

            <div className="bg-slate-900 text-white rounded-2xl p-6">

              <div className="flex items-center gap-2">

                <Lock
                  size={18}
                />

                <h3 className="font-semibold">
                  Private Workspace
                </h3>

              </div>

              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Only the two participants of
                this request can access this
                workspace.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Workspace;