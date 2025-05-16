import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const HrPage = () => {
  const [s, setS] = useState([]);
  const [e, setE] = useState();

  useEffect(() => {
    const f = async () => {
      try {
        const req = await axios.get("http://localhost:3008/staff");
        if (!req.data) {
          return setE("On data fount");
        }
        setS(req.data);
      } catch (er) {
        setE(er.message);
      }
    };
    f();
  }, []);

  return (
    <div className=" ">
      <div className=" space-y-2 c w-full">
        {e && <div className=" alert alert-error"> 😔 {e}</div>}
        <div className=" flex justify-between items-center">
          <div className=" flex space-x-4 items-center">
            <h1 className=" font-bold text-2xl">All Staffs</h1>
            <span className=" font-semibold text-2xl text-gray-500">
              {s.length}
            </span>
          </div>
          <NavLink className={" btn btn-primary"} to={"/hr/staff/new"}>
            <BsPlusCircle /> Add Staff
          </NavLink>
        </div>
        <table className=" table table-zebra">
          <thead>
            <tr>
              <td></td>
              <td>First name</td>
              <td>Last name</td>
              <td>Gender</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Address</td>
              <td>Department</td>
              <td>Post</td>
            </tr>
          </thead>
          <tbody>
            {s.map((item) => {
              return (
                <tr>
                  <td>{item.EmployeeId}</td>
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.Gender}</td>
                  <td>{item.Email}</td>
                  <td>{item.Phone}</td>
                  <td>
                    <address>{item.Address}</address>
                  </td>
                  <td>{item.DepName}</td>
                  <td>{item.PostTitle}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HrPage;
