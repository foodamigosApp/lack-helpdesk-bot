import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Slack Helpdesk Bot is running!");
});

// This endpoint will receive messages from Slack
app.post("/slack/events", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
