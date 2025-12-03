import { db } from "../config/db.js";

// Create
export const createItem = (req, res) => {
  const { title, description } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  db.query(
    "INSERT INTO items (title, description) VALUES (?, ?)",
    [title, description],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Item created successfully" });
    }
  );
};

// Read
export const getItems = (req, res) => {
  db.query("SELECT * FROM items", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// Update
export const updateItem = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  db.query(
    "UPDATE items SET title=?, description=? WHERE id=?",
    [title, description, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Item updated successfully" });
    }
  );
};

// Delete
export const deleteItem = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM items WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Item deleted successfully" });
  });
};
