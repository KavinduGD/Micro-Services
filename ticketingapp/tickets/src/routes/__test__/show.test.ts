import request from "supertest";
import { app } from "../../app";
import { signupHelper } from "../../test/auth-helper";
import mongoose from "mongoose";

it("returmn 404 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).get(`/api/tickets/${id}`).send();

  expect(response.status).toEqual(404);
});

it("return the ticket if ticket is  found", async () => {
  const title = "event";
  const price = 10;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", await signupHelper())
    .send({ title, price })
    .expect(201);

  await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
