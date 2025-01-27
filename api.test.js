const request = require("supertest");
const redis = require("./redis-client");
const app = require("./api");

const set = n =>
  request(app)
    .post("/")
    .send({ number: n });

const get = () => request(app).get("/");
const increase = () => request(app).post("/increase");
const decrease = () => request(app).post("/decrease");

afterAll(async () => {
  // Disconnect the Redis client after all tests are done
  await redis.quit();
});

test("set number correctly", async () => {
  let res;
  await set(0);
  res = await get();
  console.log("[res]", res);
  expect(res.body.number).toBe(0);

  await set(5);
  res = await get();
  expect(res.body.number).toBe(5);
});
