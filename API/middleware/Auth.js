import jwt from "jsonwebtoken";

// Middleware to authenticate the user
export default function AuthToken(req, res, next) {
  const token = req.header("token");
  
  if (!token) {
    return res.status(401).json({ error: "Access Denied. Token missing." });
  }

  if (!process.env.SECRET_KEY) {
    return res.status(500).json({ error: "Internal Server Error. Missing secret key." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid Token" });
  }
}

// Middleware to check if the user has admin role
export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied. Admin privileges required." });
  }
  next();
}

// Middleware to check if the user has super admin role
export function isSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== "superAdmin") {
    return res.status(403).json({ error: "Access Denied. Super Admin privileges required." });
  }
  next();
}

