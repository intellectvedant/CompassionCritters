import { Routes, Route } from "react-router-dom";

// pages
import Homepage from "./pages/Homepage";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/user/Dashboard";
import Admindashboard from "./pages/admin/Admindashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import Updateproduct from "./pages/admin/Updateproduct";
import Search from "./pages/Search";
import Productdetails from "./pages/Productdetails";
import Categorydetails from "./pages/Categorydetails";
import Cartpage from "./pages/Cartpage";
import Adminorder from "./pages/admin/Adminorder";
import OrderSuccessfull from "./pages/OrderSuccessfull";



// Components
import ProtectedRoute from "./components/route/Protectedroute";
import Adminroute from "./components/route/Adminroute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<Productdetails />} />
        <Route path="/category/:slug" element={<Categorydetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/order-payment-status/:order_id" element={<OrderSuccessfull/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/login" element={<Auth />} />

        {/* Dashboard User */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        {/* Dashboard Admin */}

        <Route path="/dashboard" element={<Adminroute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/orders" element={<Adminorder />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/product" element={<Products />} />
          <Route
            path="admin/update-product/:slug"
            element={<Updateproduct />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
