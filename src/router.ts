import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputError } from "./modules/middleware";
import {
	createProduct,
	deleteProduct,
	getOneProduct,
	getProducts,
	updateProduct,
} from "./handlers/product";
import {
	createUpdate,
	deleteUpdate,
	getOneUpdate,
	getUpdates,
	updateUpdate,
} from "./handlers/update";

const router = Router();

// Product

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
	"/product/:id",
	body("name").isString(),
	handleInputError,
	updateProduct
);
router.post(
	"/product",
	body("name").isString(),
	handleInputError,
	createProduct
);
router.delete("/product/:id", handleInputError, deleteProduct);

// Update

router.get("/update", handleInputError, getUpdates);
router.get("/update/:id", handleInputError, getOneUpdate);
router.put(
	"/update/:id",
	body("title").optional(),
	body("body").optional(),
	body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
	body("version").optional(),
	handleInputError,
	updateUpdate
);
router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
	body("productId").exists().isString(),
	handleInputError,
	createUpdate
);
router.delete("/update/:id", handleInputError, deleteUpdate);

// Update Point

router.get("/updatepoint", handleInputError, () => {});
router.get("/updatepoint/:id", handleInputError, () => {});
router.put(
	"/updatepoint/:id",
	body("name").optional().isString(),
	body("description").optional().isString(),
	handleInputError,
	() => {}
);
router.post(
	"/updatepoint",
	body("name").isString(),
	body("description").isString(),
	body("updateId").exists().isString(),
	handleInputError,
	() => {}
);
router.delete("/updatepoint/:id", handleInputError, () => {});

export default router;
