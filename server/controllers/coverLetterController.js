const express = require("express");
const db = require("../db/dbConfig");
const coverLetters = express.Router({ mergeParams: true });

coverLetters.post("/", async (req, res) => {
    const { user_id } = req.params;
    const { resume_id, company_name, job_title, content } = req.body;
    try {
        const newCoverLetter = await db.one(
            "INSERT INTO cover_letters (resume_id, user_id, company_name, job_title, content) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [resume_id, user_id, company_name, job_title, content]
        );
        res.status(201).json(newCoverLetter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

coverLetters.get("/", async (req, res) => {
    const { user_id } = req.params;
    try {
        const allCoverLetters = await db.any("SELECT * FROM cover_letters WHERE user_id = $1", user_id);
        res.status(200).json(allCoverLetters);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

coverLetters.get("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const coverLetter = await db.one("SELECT * FROM cover_letters WHERE user_id = $1 AND id = $2", [user_id, id]);
        res.status(200).json(coverLetter);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

coverLetters.put("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    const { resume_id, company_name, job_title, content } = req.body;
    try {
        const updatedCoverLetter = await db.one(
            "UPDATE cover_letters SET resume_id = $1, user_id = $2, company_name = $3, job_title = $4, content = $5 WHERE user_id = $6 AND id = $7 RETURNING *",
            [resume_id, user_id, company_name, job_title, content, user_id, id]
        );
        res.status(200).json(updatedCoverLetter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

coverLetters.delete("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const deletedCoverLetter = await db.one("DELETE FROM cover_letters WHERE user_id = $1 AND id = $2 RETURNING *", [user_id, id]);
        res.status(200).json(deletedCoverLetter);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = coverLetters;