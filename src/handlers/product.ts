import prisma from "../db";

export const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			products: true,
		},
	});

	res.json({ data: user.products });
};

export const getOneProduct = async (req, res) => {
	const id = req.params.id;

	const products = await prisma.product.findUnique({
		where: {
			id: id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: products });
};

export const createProduct = async (req, res, next) => {
	try {
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				belongsToId: req.user.id,
			},
		});

		res.json({ data: product });
	} catch (e) {
		next(e);
	}
};

export const updateProduct = async (req, res) => {
	const updated = await prisma.product.update({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
	console.log("INSIDE DELETE PRODUCT");
	console.log("Product ID", req.params.id, "and User ID", req.user.id);
	const deleted = await prisma.product.delete({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: deleted });
};
