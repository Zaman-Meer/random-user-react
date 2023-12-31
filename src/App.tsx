import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => (
  <>
    <ToastContainer
      transition={Slide}
      position="top-right"
      pauseOnHover
      closeOnClick
      hideProgressBar
      newestOnTop={false}
      draggable={false}
      autoClose={5000}
    />
    <AppRoutes />
  </>
);

export default App;
