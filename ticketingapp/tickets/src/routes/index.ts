import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const ticketes = await Ticket.find({});

  res.send(ticketes);
});

export { router as indexTicketRouter };
