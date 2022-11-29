const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/users");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");
const mongoose = require("mongoose");

beforeEach(setupDatabase);
afterAll(() => mongoose.disconnect());

// afterEach(() => {
//   console.log("end");
// });

test("Shouled singup a new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      name: "niteesh",
      email: "niteeshgpatil@gmail.com",
      password: "niteesh",
    })
    .expect(201);

  const user = await User.findById(res.body.user._id);
  expect(user).not.toBe(null);

  expect(res.body).toMatchObject({
    user: {
      name: "niteesh",
      email: "niteeshgpatil@gmail.com",
    },
    token: user.tokens[0].token,
  });
});

test("Should login exsting user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(res.body.user._id);

  expect(user.tokens[0].token).toBe(userOne.tokens[0].token);
});

test("Should not login not exsting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "kjdsflk",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for Unauthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete profile for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);

  expect(user).toBe(null);
});

test("should not delete profile for Unauthorized user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should uplode profile pic", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);

  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "sateesh" })
    .expect(200);

  const user = await User.findById(userOneId);

  expect(user.name).toEqual("sateesh");
});

test("Should update user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "bangalure" })
    .expect(400);
});
