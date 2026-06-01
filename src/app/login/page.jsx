"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);

      console.log(res.data.message);
    } catch (error) {
      console.log("login failed", error);
      console.log(res.data.message);
    }
  };
  return (
    <>
      <h1 className="text-3xl bg-sky-200">
        {loading ? "Processing" : "login"}
      </h1>
      <div className="bg-gray-300 h-screen w-screen flex flex-col items-center justify-center">
        <div className="bg-sky-300 rounded-sm p-4  flex flex-col ">
          <input
            type="text"
            className="mb-2 p-2 rounded-sm bg-sky-100"
            name="Username"
            id="Username"
            placeholder="UserEmail"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <input
            className="mb-2 p-2 rounded-sm bg-sky-100"
            type="password"
            name="Password"
            id="Password"
            placeholder="Password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <button onClick={onLogin}>Login</button>
        </div>
      </div>
    </>
  );
}
