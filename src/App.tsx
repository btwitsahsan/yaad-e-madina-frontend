import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./pages/Layout";
import Categories from "./pages/categories/Categories";
import Album from "./pages/album/Album";
import AdminList from "./pages/adminlist/AdminList";
import Playlist from "./pages/playlist/Playlist";
import SubscriptionPlan from "./pages/subscriptionPlan/SubscriptionPlan";
import Transactions from "./pages/transactions/Transactions";
import Suggestions from "./pages/suggestions/Suggestions";
import AddCategory from "./pages/categories/AddCategory";
import AddAlbum from "./pages/album/AddAlbum";
import Slider from "./pages/slider/Slider";
import AddSlider from "./pages/slider/AddSlider";
import HomeSections from "./pages/homesections/HomeSections";
import AddSections from "./pages/homesections/AddSections";
import AddAdmin from "./pages/adminlist/AddAdmin";
import Users from "./pages/users/Users";
import AddUser from "./pages/users/AddUser";
import AddPlaylist from "./pages/playlist/AddPlaylist";
import AddSubscriptionPlan from "./pages/subscriptionPlan/AddSubscriptionPlan";
import PageList from "./pages/addpages/PageList";
import AddPage from "./pages/addpages/AddPage";
import Audios from "./pages/audios/Audios";
import AddAudio from "./pages/audios/AddAudio";
import OneSignalNotification from "./settings/OneSignalNotification";
import AppUpdate from "./settings/AppUpdate";
import OtherSettings from "./settings/OtherSettings";
import Footer from "./components/footer/Footer";
import SignIn from "./pages/Auths/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import AddNaatKhawan from "./pages/naatkhawan/AddNaatkhawan";
import NaatKhawan from "./pages/naatkhawan/Naatkhawan";
// import { decryptCookie } from "./utils/cookie";
import Cookies from "js-cookie";

const App: React.FC = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in cookies
    // const token = decryptCookie("token");
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <Router>
      {isAuthenticated ? (
        <>
          <div className="flex">
            <Sidebar sidebarToggle={sidebarToggle} />
            <Navbar
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
              onLogout={handleLogout}
            />
          </div>
          <Layout sidebarToggle={sidebarToggle}>
            <Routes>
              {/* Redirect from the root to the dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addcategory" element={<AddCategory />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/naatkhawan" element={<NaatKhawan />} />
                <Route path="/addnaatkhawan" element={<AddNaatKhawan />} />
                <Route path="/album" element={<Album />} />
                <Route path="/addalbum" element={<AddAlbum />} />
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/addplaylist" element={<AddPlaylist />} />
                <Route path="/audios" element={<Audios />} />
                <Route path="/addaudio" element={<AddAudio />} />
                <Route path="/slider" element={<Slider />} />
                <Route path="/addslider" element={<AddSlider />} />
                <Route path="/homesections" element={<HomeSections />} />
                <Route path="/addsections" element={<AddSections />} />
                <Route path="/users" element={<Users />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/subadmin" element={<AdminList />} />
                <Route path="/addadmin" element={<AddAdmin />} />
                <Route path="/subscriptionplan" element={<SubscriptionPlan />} />
                <Route path="/addsubscriptionplan" element={<AddSubscriptionPlan />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/pages" element={<PageList />} />
                <Route path="/addpage" element={<AddPage />} />
                <Route path="/onesignalnotification" element={<OneSignalNotification />} />
                <Route path="/appupdatepopup" element={<AppUpdate />} />
                <Route path="/othersettings" element={<OtherSettings />} />
              </Route>
            </Routes>
          </Layout>
          <Footer
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
        </>
      ) : (
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignIn onLogin={handleLogin} />} />
          {/* Redirect from the root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
