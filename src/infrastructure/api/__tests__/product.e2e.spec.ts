import { app, sequelize } from "../express";
import request from "supertest";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 10.0);
    const product2 = new Product("2", "Product 2", 20.0);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    expect(listResponse.body.products[0].id).toBe("1");
    expect(listResponse.body.products[0].name).toBe("Product 1");
    expect(listResponse.body.products[0].price).toBe(10.0);
    expect(listResponse.body.products[1].id).toBe("2");
    expect(listResponse.body.products[1].name).toBe("Product 2");
    expect(listResponse.body.products[1].price).toBe(20.0);
  });

  it("should return an empty list when no products exist", async () => {
    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products).toHaveLength(0);
  });

  it("should list all products as XML", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 10.0);
    await productRepository.create(product1);

    const listResponse = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponse.text).toContain(`<products>`);
    expect(listResponse.text).toContain(`<product>`);
    expect(listResponse.text).toContain(`<name>Product 1</name>`);
    expect(listResponse.text).toContain(`<price>10</price>`);
    expect(listResponse.text).toContain(`</product>`);
    expect(listResponse.text).toContain(`</products>`);
  });
});
