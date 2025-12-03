import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Hashing failed" });

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash],
      (err) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result || result.length === 0) return res.status(404).json({ message: "User not found" });

    bcrypt.compare(password, result[0].password, (err, match) => {
      if (err) return res.status(500).json({ error: err });
      if (!match) return res.status(401).json({ message: "Incorrect password" });

      const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

      return res.json({ message: "Login successful", token });
    });
  });
};
