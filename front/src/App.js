import React from "react";

import "../src/index.css";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import WritePage from "./pages/WritePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider, useGlobalContext } from "./components/context";
import FilteredPosts from "./pages/FilteredPosts";

const App = ({ auth }) => {
  return (
    <AppProvider>
      <Routes auth={auth}>
        <Route path="/" element={<SharedLayout auth={auth} />}>
          <Route index element={auth ? <Home /> : <LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:postId" element={<SinglePage />} />
          <Route path="/posts/filtered" element={<FilteredPosts />} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/write"
            element={
              <ProtectedRoute auth={auth}>
                <WritePage auth={auth} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute auth={auth}>
                <SettingsPage auth={auth} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
