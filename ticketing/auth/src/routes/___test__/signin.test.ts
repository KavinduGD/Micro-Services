import request from "supertest";
import { app } from "../../app";

it("successful login", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "kavidu123",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "kavidu123",
    })
    .expect(200);
});

it("fails when a email does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "kavidu123",
    })
    .expect(400);
});

it("unsuccessful login - invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "kavidu123",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "kavidu1234",
    })
    .expect(400);
});

it("successful login - with a cookie", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "kavidu123",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "kavidu123",
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
