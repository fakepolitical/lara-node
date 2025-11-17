// index.js on Render
import { Translator } from "@translated/lara";

const lara = new Translator({ apiKey: process.env.LARA_API_KEY });

async function translate(text, source = "zh", target = "en") {
  // Lara SDK 需要明确 source，不能用 "auto"
  return await lara.translate(text, source, target);
}

// 使用 express 或类似框架
import express from "express";
const app = express();

// 确保 express 解析 JSON 时 UTF-8
app.use(express.json({ type: "application/json; charset=utf-8" }));

app.post("/translate", async (req, res) => {
  try {
    const { text, source, target } = req.body;
    const translation = await translate(text, source, target);
    res.json({ translation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server listening on port", port));
