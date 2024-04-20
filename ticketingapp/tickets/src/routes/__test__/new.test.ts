import request from "supertest";
import { app } from "../../app";
import { signupHelper } from "../../test/auth-helper";
import { Ticket } from "../../models/ticket";

it("Has a route hander listing to /api/ticker for post req", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can be only be access if the user sign in ", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a staus other than 401 is the use is signed in ", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({
      title: "dsdsdsds",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({
      title: "dsdsd",
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({
      title: "dsdsdsdsd",
      price: 49,
    })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(49);
  expect(tickets[0].title).toEqual("dsdsdsdsd");
});
