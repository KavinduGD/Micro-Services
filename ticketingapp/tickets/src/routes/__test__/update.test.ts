import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signupHelper } from "../../test/auth-helper";

it("return a 404 if the provided id does not exits", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", await signupHelper())
    .send({
      title: "sdsdsd",
      price: 34,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/{id}`)
    .send({
      title: "sdsdsd",
      price: 34,
    })
    .expect(401);
});

it("retuens a 401 if the user doe not owns the tickets", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({
      title: "dsdsds",
      price: 23,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", await signupHelper())
    .send({
      title: "new title",
      price: 34,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = await signupHelper();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "dsdsds",
      price: 23,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "sdsds",
      price: -20,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = await signupHelper();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "dsdsds",
      price: 23,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "newddsdd",
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({});

  expect(ticketResponse.body.title).toEqual("newddsdd");
  expect(ticketResponse.body.price).toEqual(100);
});
