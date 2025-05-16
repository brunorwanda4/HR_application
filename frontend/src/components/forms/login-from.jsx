import React, { useState, useTransition } from "react";
import { BsExclamation } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginFrom = () => {
  const [fromData, setFromData] = useState({
    username: "",
    password: "",
  });

  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState();
  const [ok, setOk] = useState();
  const redirect = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    setOk(null);
    startTransition(async () => {
      try {
        const req = await axios.post(
          "http://localhost:3008/user/login",
          fromData
        );
        const { token, user, message } = req.data;
        setOk(`${message}`);
        if (token || message) {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user", JSON.stringify(user));
          redirect("/hr/staff/all");
        } else {
        setErr("Login response did not include user or token.");
        }
      } catch (error) {
        setErr(`${error.message}`);
      }
    });
  };
  return (
    <div className=" grid place-content-center min-h-screen">
      <form onSubmit={handleSubmit} className=" c space-y-4 w-96">
        <h2 className="text-center font-bold text-2xl ">Welcome Back</h2>
        {err && (
          <div className=" alert alert-error">
            😔
            <span>{err}</span>
          </div>
        )}
        {ok && (
          <div className=" alert alert-success">
            😎
            <span>{ok}</span>
          </div>
        )}
        <div className=" space-y-2">
          <label htmlFor="" className=" label">
            Username
          </label>
          <input
            disabled={isPending}
            onChange={handleChange}
            name="username"
            value={setFromData.username}
            placeholder="username"
            className=" i"
          />
          <label htmlFor="" className=" label">
            Password
          </label>
          <input
            disabled={isPending}
            placeholder="*****"
            type="password"
            name="password"
            className=" i"
            value={setFromData.username}
            onChange={handleChange}
          />
          <button type="submit" disabled={isPending} className=" btn w-full btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginFrom;
