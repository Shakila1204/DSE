import { db } from "../config/db.js"; 
import bcrypt from "bcrypt"; 
export const register = (req, res) => { 
  const { name, email, password } = req.body; 
 
  bcrypt.hash(password, 10, (err, hash) => { 
    if (err) return res.json({ error: "Hashing failed" }); 
 
    db.query( 
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, hash], 
      (err) => { 
        if (err) return res.json({ error: err }); 
        return res.json({ message: "User registered successfully" }); 
      } 
    ); 
  }); 
}; 

//LOGIN 

import jwt from "jsonwebtoken"; 
 
export const login = (req, res) => { 
  const { email, password } = req.body; 
 
  db.query( 
    "SELECT * FROM users WHERE email = ?", 
    [email], 
    (err, result) => { 
      if (err) return res.json({ error: err }); 
      if (result.length === 0) return res.json({ message: "User not found" }); 
 
      bcrypt.compare(password, result[0].password, (err, match) => { 
        if (!match) return res.json({ message: "Incorrect password" }); 
 
        const token = jwt.sign( 
          { id: result[0].id }, 
          process.env.JWT_SECRET, 
          { expiresIn: "1d" } 
        ); 
 
        return res.json({ message: "Login successful", token }); 
      }); 
    } 
  ); 
}; 
