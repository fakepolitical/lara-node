// index.js
import express from "express";
import { Credentials, Translator } from "@translated/lara";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());


const credentials = new Credentials(
  process.env.LARA_ACCESS_KEY_ID,
  process.env.LARA_ACCESS_KEY_SECRET
);
const lara = new Translator(credentials);

// POST /translate
app.post("/translate", async (req, res) => {
  try {
    const { text, source = "zh-CN", target = "en" } = req.body;
     console.log("Incoming request:", { text, source, target });
    if (!text) return res.status(400).json({ error: "Missing text" });

    const result = await lara.translate(text, source, target);
    res.json({ translation: result.translation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

