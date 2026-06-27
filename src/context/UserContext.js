"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  user: null,
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);

       
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
