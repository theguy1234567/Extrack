"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function page() {
  const [loading, setLoading] = useState(false);
  //add signin btn disabled state later set true if all fields filled
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onSignup = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data);
    } catch (error) {
      console.log("axios fetch failed form page", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl bg-sky-200">
        {loading ? "Processing" : "Signup"}
      </h1>
      <div className="bg-gray-300 h-screen w-screen flex flex-col items-center justify-center">
        <div className="bg-sky-300 rounded-sm p-4  flex flex-col ">
          <input
            type="text"
            className="mb-2 p-2 rounded-sm bg-sky-100"
            name="Username"
            id="Username"
            placeholder="UserName"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
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
          <button onClick={onSignup}>Signup</button>
        </div>
      </div>
    </>
  );
}
