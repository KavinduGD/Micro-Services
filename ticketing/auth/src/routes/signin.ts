import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.send("HI");
});

export { router as signinRouter };
