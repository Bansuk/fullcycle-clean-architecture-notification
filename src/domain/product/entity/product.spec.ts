import Product from "./product";
import NotificationError from "../../@shared/notification/notification.error";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should accumulate multiple validation errors simultaneously", () => {
    let caughtError!: NotificationError;
    try {
      new Product("123", "", -1);
    } catch (e) {
      caughtError = e as NotificationError;
    }

    expect(caughtError).toBeInstanceOf(NotificationError);
    expect(caughtError.errors).toHaveLength(2);
    expect(caughtError.errors).toEqual(
      expect.arrayContaining([
        { context: "product", message: "Name is required" },
        { context: "product", message: "Price must be greater than zero" },
      ])
    );
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
