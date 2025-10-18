import express from "express";

const app = express();
app.use(express.json());

// Slack URL verification
app.post("/slack/events", (req, res) => {
  const { type, challenge } = req.body;

  // If Slack is verifying the URL, respond with the challenge
  if (type === "url_verification") {
    return res.send(challenge);
  }

  // Handle regular events later
  console.log("Slack event received:", req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Slack Helpdesk Bot is running!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
