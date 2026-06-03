import jwt from "jsonwebtoken";

export default function verifyAndGetUserid(token) {
  console.log("verifyAndGetUserid called");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.ACC_TOKEN_SEC);
  return decoded.id;
}
