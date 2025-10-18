import express from "express";
import fetch from "node-fetch";
 
const app = express();
app.use(express.json());

// Environment variable for your Intercom token
const INTERCOM_TOKEN = process.env.INTERCOM_TOKEN;

app.post("/intercom-webhook", async (req, res) => {
  try {
    const { text, user } = req.body.event || req.body;

    console.log("Received Slack data:", req.body);

    // Send message to Intercom API
    const response = await fetch("https://api.intercom.io/messages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${INTERCOM_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        message_type: "inapp",
        body: `New Slack message from ${user || "Unknown"}:\n\n${text}`,
        from: {
          type: "admin",
          id: "YOUR_ADMIN_ID" // Replace this later with your actual Intercom admin ID
        }
      })
    });

    const data = await response.json();
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.error("Error sending to Intercom:", error);
    res.status(500).send({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Slack → Intercom webhook is running ✅");
});

app.listen(3000, () => console.log("Server running on port 3000"));
