import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductValidator from "../validator/product.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductValidator();
  }
}
