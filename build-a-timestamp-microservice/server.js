
import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api", (req, res) => {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;

  let date;

  if (/^\d+$/.test(dateParam)) {
    date = new Date(Number(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Your app is listening on port ${PORT}`);
});
