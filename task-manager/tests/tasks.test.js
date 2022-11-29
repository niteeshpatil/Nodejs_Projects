const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userOneId,
  setupDatabase,
  usersecondId,
  secondOne,
  taskthree,
  tasktwo,
} = require("./fixtures/db");
const mongoose = require("mongoose");

beforeEach(setupDatabase);
afterAll(() => mongoose.disconnect());

test("should create task for user", async () => {
  const res = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "webdev",
    })
    .expect(201);

  const task = await Task.findById(res.body._id);

  expect(task).not.toBe(null);
});

test("should get  task for user", async () => {
  const res = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  const tasks = [...res.body];

  expect(tasks.length).toBe(2);
});

test("should not delete  others task", async () => {
  const res = await request(app)
    .delete(`/tasks/${tasktwo._id}`)
    .set("Authorization", `Bearer ${secondOne.tokens[0].token}`)
    .expect(404);

  const task = await Task.findById(tasktwo._id);
  expect(task).not.toBe(null);
});

test("should delete  task for user", async () => {
  const res = await request(app)
    .delete(`/tasks/${taskthree._id}`)
    .set("Authorization", `Bearer ${secondOne.tokens[0].token}`)
    .expect(200);
  const task = await Task.findById(taskthree._id);
  expect(task).toBe(null);
});
