import express from "express";
import "reflect-metadata";
import { profileRoutes } from "./modules/profiles/routes/profile.route";

const app = express();
app.use(express.json());

app.use("/healthz", (req, res) => {
  return res.send("Hello");
});

app.use("/profiles", profileRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({ code: status, message });
});

export default app;
