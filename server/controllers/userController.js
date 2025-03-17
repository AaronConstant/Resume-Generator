const express = require("express");
const db = require("../db/dbConfig");
const users = express.Router();

users.post("/", async (req, res) => {
    const { first_name, last_name, dob, username, email, password_hash } = req.body;
    try {
        const newUser = await db.one(
            "INSERT INTO users (first_name, last_name, dob, username, email, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [first_name, last_name, dob, username, email, password_hash]
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

users.get("/", async (req, res) => {
    try {
        const allUsers = await db.any("SELECT * FROM users");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

users.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.one("SELECT * FROM users WHERE user_id = $1", id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

users.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, dob, username, email, password_hash } = req.body;
    try {
        const updatedUser = await db.one(
            "UPDATE users SET first_name = $1, last_name = $2, dob = $3, username = $4, email = $5, password_hash = $6 WHERE user_id = $7 RETURNING *",
            [first_name, last_name, dob, username, email, password_hash, id]
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

users.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await db.one("DELETE FROM users WHERE user_id = $1 RETURNING *", id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = users;

