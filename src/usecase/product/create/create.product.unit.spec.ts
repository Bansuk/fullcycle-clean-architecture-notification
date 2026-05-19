import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    await expect(useCase.execute({ ...input, name: "" })).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    await expect(useCase.execute({ ...input, price: -1 })).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
