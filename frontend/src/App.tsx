import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import SignUp from "./components/custom/pages/auth/SignUp";
import Login from "./components/custom/pages/auth/Login";
import Forgot from "./components/custom/pages/auth/Forgot";
import Reset from "./components/custom/pages/auth/Reset";
import PageTransitionWrapper from "./components/custom/pages/auth/PageTransitionWrapper";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/home/Home";


import Project from "./pages/projects/Project";

import Issue from "./pages/issue/Issue";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import "./App.css";

function App() {
  const AuthRedirect = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (user) {
      return <Navigate to="/home" replace />;
    }

    return <Navigate to="/signup" replace />;
  };

  return (
    <div className="App">
      {/* 🔔 Global Toast */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,

          style: {
            background: "linear-gradient(135deg, #2563eb, #059669)",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "14px 16px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
          },

          success: {
            duration: 2500,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },

          error: {
            duration: 4500,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },

          loading: {
            duration: Infinity,
            iconTheme: {
              primary: "#facc15",
              secondary: "#ffffff",
            },
          },

          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        }}
      />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<AuthRedirect />} />

          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <PageTransitionWrapper>
                  <SignUp />
                </PageTransitionWrapper>
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageTransitionWrapper>
                  <Login />
                </PageTransitionWrapper>
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <PageTransitionWrapper>
                  <Forgot />
                </PageTransitionWrapper>
              </PublicRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <PageTransitionWrapper>
                  <Reset />
                </PageTransitionWrapper>
              </PublicRoute>
            }
          />

          {/* ---------- PROTECTED ROUTES ---------- */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Project />} />
          </Route>

          <Route
            path="/issues"
            element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Issue />} />
          </Route>
          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
