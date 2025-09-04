const request = require("supertest");

const app = require("../server");

describe("API Tests", () => {
  let expect;

  before(async () => {
    ({ expect } = await import("chai"));
  });

  it("Debería recuperar todos los recursos", async () => {
    const res = await request(app).get("/resource");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("Debería crear un nuevo recurso", async () => {
    const newResource = { name: "Resource 4", type: "Type D" };

    const res = await request(app).post("/resource").send(newResource);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
  });

  it("Debería borrar el recurso por el ID", async () => {
    const res = await request(app).delete("/resource/1");

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property("message", "Recurso Borrado");
  });

  it("Debería retornar un código de estado 404 cuando se trata de borrar un recurso no encontrado", async () => {
    const res = await request(app).delete("/resource/80");

    expect(res.status).to.equal(404);

    expect(res.body).to.have.property("error", "Recurso no encontrado");
  });

  it("Debería poder acceder al recurso con un token válido", async () => {
    const res = await request(app)
      .get("/secure-resource")
      .set("Authorization", "Bearer valid_token");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Acceso a recurso seguro");
  });

  it("Debería no poder acceder al recurso seguro con un token de autenticación inválido", async () => {
    const res = await request(app)
      .get("/secure-resource")
      .set("Authorization", "Bearer jhkdsksdsah");
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("error", "Autenticación requerida");
  });

  it("Debería obtener una respuesta XML", async () => {
    const res = await request(app).get("/xml-response");

    expect(res.status).to.equal(200);
    expect(res.header["content-type"]).to.include("application/xml");
    expect(res.text).to.have.include("<resource>");
  });
});
