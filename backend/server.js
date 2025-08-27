import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: { query, number: 12, apiKey: API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
