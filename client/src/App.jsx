
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FindHelp from "./pages/FindHelp.jsx";
import RequestDetails from "./pages/RequestDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateRequest from "./pages/CreateRequest.jsx";
import MyRequests from "./pages/MyRequests.jsx";
import Workspace from "./pages/Workspace";
import MyTasks from "./pages/MyTasks";
import TransactionHistory from "./pages/TransactionHistory";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Find Help */}
        <Route
          path="/find-help"
          element={
            <ProtectedRoute>
              <FindHelp />
            </ProtectedRoute>
          }
        />

        {/* Protected Create Request */}
        <Route
          path="/create-request"
          element={
            <ProtectedRoute>
              <CreateRequest />
            </ProtectedRoute>
          }
        />

        {/* Protected My Requests */}
        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        {/* Protected My Tasks */}
        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />

        {/* Protected Transaction History */}
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        {/* Protected Notifications */}
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>
        {/* Protected Request Details */}
        <Route
          path="/request/:id"
          element={
            <ProtectedRoute>
              <RequestDetails />
            </ProtectedRoute>
          }
        />

        {/* Protected Workspace */}
        <Route
          path="/workspace/:id"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
