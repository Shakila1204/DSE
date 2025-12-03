import { db } from "../config/db.js";

// Return all users without sensitive fields
export const getUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, created_at FROM users",
    (err, results) => {
      if (err) return res.status(500).json({ error: String(err) });
      return res.json(results);
    }
  );
};
