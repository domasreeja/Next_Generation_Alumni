import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import StudentDashboard from "./pages/StudentDashboard.jsx";
import AlumniDashboard from "./pages/AlumniDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AlumniDirectory from "./pages/AlumniDirectory.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Jobs from "./pages/Jobs.jsx";
import AdminAlumniApprovals from "./pages/AdminAlumniApprovals.jsx";
import AdminJobManagement from "./pages/AdminJobManagement.jsx";
import AdminMentorshipOversight from "./pages/AdminMentorshipOversight.jsx";
import FindMentors from "./pages/FindMentors.jsx";
import ViewAlumni from "./pages/ViewAlumni.jsx";
import AdminRegister from "./pages/AdminRegister";

import AlumniMentorship from "./pages/AlumniMentorship";
import AlumniPostJob from "./pages/AlumniPostJob";
import MyPostedJobs from "./pages/MyPostedJobs";
import AlumniJobApplications from "./pages/AlumniJobApplications";
import AlumniProfile from "./pages/AlumniProfile";
import RequestSession from "./pages/RequestSession";
import StudentProfile from "./pages/StudentProfile";

function App() {
  return (
    <div className="app-layout">

      {/* LEFT SIDEBAR */}
      <Navbar />

      {/* RIGHT CONTENT AREA */}
      <div className="main-content">

        {/* Background animation */}
        {/*<div className="background-shapes">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="animated-bg">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>*/}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/alumni-directory" element={<AlumniDirectory />} />
          <Route path="/jobs" element={<Jobs />} />

          <Route path="/student/mentors" element={<FindMentors />} />
          <Route path="/student/alumni" element={<ViewAlumni />} />

          <Route path="/admin/approve-alumni" element={<AdminAlumniApprovals />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/alumni/mentorship" element={<AlumniMentorship />} />

          <Route
            path="/alumni/profile"
            element={
              <ProtectedRoute role="alumni">
                <AlumniProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute role="student">
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni"
            element={
              <ProtectedRoute role="alumni">
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/approvals"
            element={
              <ProtectedRoute role="admin">
                <AdminAlumniApprovals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute role="admin">
                <AdminJobManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/mentorship"
            element={
              <ProtectedRoute role="admin">
                <AdminMentorshipOversight />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni/post-job"
            element={
              <ProtectedRoute role="alumni">
                <AlumniPostJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni/my-jobs"
            element={
              <ProtectedRoute role="alumni">
                <MyPostedJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni/job-applications"
            element={
              <ProtectedRoute role="alumni">
                <AlumniJobApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/request-session/:mentorId"
            element={
              <ProtectedRoute role="student">
                <RequestSession />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>
    </div>
  );
}

export default App;