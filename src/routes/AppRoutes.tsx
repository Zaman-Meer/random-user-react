import { Route, Routes, Navigate } from "react-router-dom";
import UserForm from "../pages/UserForm";
import UserDetails from "../pages/UserDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/form/add" />} />
      <Route path="/form/add" element={<UserForm />} />
      <Route path="/form/edit/:id" element={<UserForm />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
};

export default AppRoutes;
