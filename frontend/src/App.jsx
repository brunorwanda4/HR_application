import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginFrom from "./components/forms/login-from";
import LayoutHr from "./layout/hr";
import ProtectLayout from "./layout/protect-layout";

const App = () => {
  const t = localStorage.getItem("auth_token");
  const u = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <div className=" min-h-screen">
        <Routes>
          <Route path="/" element={<LoginFrom />} />
          <Route element={<ProtectLayout />}>
            <Route path="/hr/*" element={<LayoutHr />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
