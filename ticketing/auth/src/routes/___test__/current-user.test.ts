import request from "supertest";
import { app } from "../../app";
import { signupHelper } from "../../test/auth-helper";

it("get current user susscess", async () => {
  const cookie = await signupHelper();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie!)
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("response with null if not user not authernicated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send({})
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
