import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = { name: "Product 1", price: 100 };
    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });

    const productModel = await ProductModel.findOne({ where: { id: output.id } });
    expect(productModel).not.toBeNull();
    expect(productModel.name).toBe(input.name);
    expect(productModel.price).toBe(input.price);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    await expect(useCase.execute({ name: "", price: 100 })).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    await expect(useCase.execute({ name: "Product 1", price: -1 })).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
