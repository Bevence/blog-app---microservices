import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios
    .post("http://comments-clusterip-srv:4001/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://comments-clusterip-srv:4002/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://comments-clusterip-srv:4003/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
