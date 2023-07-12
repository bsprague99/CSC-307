const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./backend");
const barberModel = require('./models/barber')

require("dotenv").config();

describe("GET /barbers", () => {
  it("should return all barbers", async () => {
    const res = await request(app).get("/barbers");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /barbers/:name", () => {
  it("should return barber with specific name", async () => {
    const res = await request(app).get("/barbers/Adam Meza");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /barbers/nameandemail/:name/:email", () => {
  it("should return barber with specific name", async () => {
    const res = await request(app).get("/barbers/nameandemail/Adam Meza/adam@mezanet.com");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /barbers/:name/appointments", () => {
  it("should return barber with specific name", async () => {
    const res = await request(app).get("/barbers/Adam Meza/appointments");
    expect(res.statusCode).toBe(201);
  });
});



describe("POST /barbers/:name/avail", () => {
  const mock_avail_list = [{_id: new mongoose.Types.ObjectId("507f191e810c19729de860ea"),
  startTime: new Date("2023-03-22T16:00:00.312Z"),
  endTime: new Date("2023-03-22T16:30:00.312Z")}]
  it("should return barber with specific name", async () => {
    const res = await request(app).post("/barbers/Adam Meza/avail").send(mock_avail_list);
    expect(res.statusCode).toBe(201);
  });
});

describe("DELETE /barbers/:name/avail", () => {
  const mock_avail_list = [{_id: new mongoose.Types.ObjectId("507f191e810c19729de860ea"),
  startTime: new Date("2023-03-22T16:00:00.312Z"),
  endTime: new Date("2023-03-22T16:30:00.312Z")}]
  it("should return barber with specific name", async () => {
    const res = await request(app).delete("/barbers/Adam Meza/avail").send(mock_avail_list[0]);
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /barbers/:name/appointments", () => {
  const mock_appoint = {_id: new mongoose.Types.ObjectId("507f191e810c19729de860ea"),
  date: {startTime: new Date("2023-03-22T16:00:00.312Z"),
  endTime: new Date("2023-03-22T16:30:00.312Z")},
  clientName: "jared",
  cientEmail: "j@gmail.com",
  barber_id: new mongoose.Types.ObjectId("507f191e810c19729de860ea")}
  it("should return barber with specific name", async () => {
    const res = await request(app).post("/barbers/Adam Meza/appointments").send(mock_appoint);
    expect(res.statusCode).toBe(201);
  });
});


describe("GET /appointments/", () => {
  it("should return barber with specific name", async () => {
    const res = await request(app).get("/appointments");
    expect(res.statusCode).toBe(200);
  });
});


describe("POST /appointments/", () => {
  const mock_appoint = {
  date: {startTime: new Date("2023-03-22T16:00:00.312Z"),
         endTime: new Date("2023-03-22T16:30:00.312Z")},
  clientName: "jared",
  clientEmail: "j@gmail.com",
  barber_id: new mongoose.Types.ObjectId("507f191e810c19729de860ea")}
  it("should return barber with specific name", async () => {
    const res = await request(app).post("/appointments").send(mock_appoint);
    expect(res.statusCode).toBe(201);
  });
});

describe("POST fails /appointments/", () => {
  const bad_appoint = {
  date: {startTime: new Date("2023-03-22T16:00:00.312Z"),
         endTime: new Date("2023-03-22T16:30:00.312Z")},
  clientName: "jared",
  failure: "j@gmail.com",
  barber_id: new mongoose.Types.ObjectId("507f191e810c19729de860ea")}
  it("should return barber with specific name", async () => {
    const res = await request(app).post("/appointments").send(bad_appoint);
    expect(res.statusCode).toBe(500);
  });
});