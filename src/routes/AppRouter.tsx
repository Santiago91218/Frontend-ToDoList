import { Navigate, Route, Routes } from "react-router";
import { ScreenBacklog } from "../components/screens/ScreenBacklog/ScreenBacklog";
import { ScreenSprint } from "../components/screens/ScreenSprint/ScreenSprint";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/backlog" />} />
      <Route path="/backlog" element={<ScreenBacklog />} />
      <Route path="/sprint/:id" element={<ScreenSprint />} />
    </Routes>
  );
};
