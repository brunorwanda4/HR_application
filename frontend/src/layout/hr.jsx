import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import HrPage from "../page/hr";
import UsersPage from "../page/users";
import AddStaffFrom from "../components/forms/add-staff-from";

const LayoutHr = () => {
  return (
    <div className=" flex">
      <nav className=" space-y-4 w-64 flex flex-col h-screen px-4 bg-base-100 border-b border-base-content/20 shadow">
        <NavLink to={"/hr"}>
          <h2 className=" font-bold text-2xl">
            Hospital <span className=" text-primary">HR</span>
          </h2>
        </NavLink>
        <div className=" flex space-y-2 flex-col">
          <NavLink
            to={"/hr/staff/all"}
            className={(e) =>
              `btn  w-full justify-start ${
                e.isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/hr/staff/new"}
            className={(e) =>
              `btn  w-full justify-start ${
                e.isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            Add Employee
          </NavLink>
          <NavLink
            to={"/hr/users"}
            className={(e) =>
              `btn  w-full justify-start ${
                e.isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            Users
          </NavLink>
        </div>
      </nav>
      <div className=" px-6 mt-8">
        <Routes>
          <Route path="/staff/all" element={<HrPage />} />
          <Route
            path="/staff/new"
            element={
              <div className=" grid place-self-center">
                <AddStaffFrom />
              </div>
            }
          />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default LayoutHr;
