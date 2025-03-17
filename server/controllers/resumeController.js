const express = require("express");
const db = require("../db/dbConfig");
const resumes = express.Router({ mergeParams: true });

resumes.post("/", async (req, res) => {
    const { user_id } = req.params;
    try {
        const newResume = await db.one(
            "INSERT INTO resumes (user_id) VALUES ($1) RETURNING *",
            [user_id]
        );
        res.status(201).json(newResume);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

resumes.get("/", async (req, res) => {
    const { user_id } = req.params;
    try {
        const allResumes = await db.any("SELECT * FROM resumes WHERE user_id = $1", user_id);
        res.status(200).json(allResumes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

resumes.get("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const resume = await db.one("SELECT * FROM resumes WHERE user_id = $1 AND id = $2", [user_id, id]);
        res.status(200).json(resume);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

resumes.put("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const updatedResume = await db.one(
            "UPDATE resumes SET user_id = $1 WHERE id = $2 RETURNING *",
            [user_id, id]
        );
        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

resumes.delete("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const deletedResume = await db.one("DELETE FROM resumes WHERE user_id = $1 AND id = $2 RETURNING *", [user_id, id]);
        res.status(200).json(deletedResume);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = resumes;