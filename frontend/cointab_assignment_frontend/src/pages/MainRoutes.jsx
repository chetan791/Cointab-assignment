import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserPage } from "./UserPage";
import { PostPage } from "./PostPage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/post" element={<PostPage />} />
    </Routes>
  );
};
