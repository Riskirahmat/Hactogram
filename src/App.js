import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Photos from "./routes/Photos.jsx";
import CreatePhoto from "./routes/CreatePhoto.jsx";
import Detail from "./routes/Detail.jsx";
import SignIn from "./routes/SignIn.jsx";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound.jsx";
import Home from "./layout/Home.jsx";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<Photos />} />
        <Route path="create" element={<CreatePhoto />} />
        <Route path="photo/:id" element={<Detail />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
