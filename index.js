import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Slack event verification
app.post("/slack/events", async (req, res) => {
  const { type, challenge, event } = req.body;

  // ✅ Step 1: Handle Slack URL verification
  if (type === "url_verification") {
    return res.send(challenge);
  }

  // ✅ Step 2: Acknowledge the request to Slack right away
  res.sendStatus(200);

  // ✅ Step 3: Process message or file events
  if (event && event.type === "message" && !event.bot_id) {
    console.log("📩 Message received:", event.text);

    // If there’s a file attached, log file info
    if (event.files && event.files.length > 0) {
      event.files.forEach(file => {
        console.log("📎 File shared:", file.name, file.url_private);
      });
    }

    // Later: send this data to Intercom
  }
});

app.get("/", (req, res) => {
  res.send("Slack Helpdesk Bot is running and listening for events!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
