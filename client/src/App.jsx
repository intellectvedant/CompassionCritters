import { Routes, Route } from "react-router-dom";



// pages
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/user/Dashboard";
import Admindashboard from "./pages/admin/Admindashboard";

// Components
import ProtectedRoute from "./components/route/Protectedroute";
import Adminroute from "./components/route/Adminroute";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute/>}>
          <Route path="user" element={<Dashboard/>}/>
        </Route>
        <Route path="/dashboard" element={<Adminroute/>}>
          <Route path="admin" element={<Admindashboard/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
