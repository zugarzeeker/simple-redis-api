const request = require("supertest");
const app = require("./api");

const set = n =>
  request(app)
    .post("/")
    .send({ number: n });

const get = () => request(app).get("/");
const increase = () => request(app).post("/increase");
const decrease = () => request(app).post("/decrease");

test("set number correctly", async () => {
  let res;
  await set(0);
  res = get();
  console.log("[res]", res);
  expect(res.number).toBe(0);

  await set(5);
  res = await get();
  expect(res.number).toBe(5);
});
