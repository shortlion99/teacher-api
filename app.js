import express from "express";
import dotenv from "dotenv";
import registerRoute from "./src/routes/register.js";
import commonStudentsRoute from "./src/routes/commonstudents.js";
import suspendRoute from "./src/routes/suspend.js";
import notificationsRoute from "./src/routes/notifications.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", registerRoute);
app.use("/api", commonStudentsRoute);
app.use("/api", suspendRoute);
app.use("/api", notificationsRoute);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
