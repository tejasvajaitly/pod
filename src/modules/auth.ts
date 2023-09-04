import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	);
	return token;
};

export const checkUserExists = async (userId) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	return user !== null;
};

export const protect = async (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "not authorized" });
		return;
	}

	const [, token] = bearer.split(" ");
	if (!token) {
		res.status(401);
		res.json({ message: "not authorized" });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		const userExists = await checkUserExists(user.id);

		if (!userExists) {
			throw new Error("User not found");
		}
		req.user = user;
		next();
	} catch (e) {
		res.status(401);
		res.json({ message: "not authorized" });
		return;
	}
};
