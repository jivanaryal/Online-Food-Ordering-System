import { Route, Routes } from "react-router";
import Home from "./Home";
import Hello from "./components/Hello";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hello" element={<Hello />} />
    </Routes>
  );
};

export default Routers;
