const express = require("express");
const cors = require("cors");
const postgres = require("postgres");

const sql = postgres({
	database: "proyectofrontend",
	user: "frontend",
	password: "frontend",
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Pong");
});

app.get("/mensajes", async (req, res) => {
	try {
		const { correo, contrasena } = req.body;
		const usuarios =
			await sql`SELECT id FROM usuarios WHERE correo = ${correo} AND
				contrasena = ${contrasena}`;
		if (usuarios.length === 0) throw new Error("Credenciales inválidas");

		const mensajes = await sql`SELECT * FROM mensajes`;
		res.json(mensajes);
	} catch (e) {
		res.status(400).send({ error: e.message, stack: e.stack });
	}
});

app.post("/mensajes", async (req, res) => {
	try {
		const { nombre, correo, mensaje } = req.body;
		await sql`INSERT INTO mensajes (nombre, correo, mensaje) VALUES
			(${nombre}, ${correo}, ${mensaje})`;

		res.status(201).send(req.body);
	} catch (e) {
		res.status(400).send({ error: e.message, stack: e.stack });
	}
});

app.delete("/mensajes/:id", async (req, res) => {
	try {
		const { correo, contrasena } = req.body;
		const usuarios =
			await sql`SELECT id FROM usuarios WHERE correo = ${correo} AND
				contrasena = ${contrasena}`;
		if (usuarios.length === 0) throw new Error("Credenciales inválidas");

		const { id } = req.params;
		await sql`DELETE FROM mensajes WHERE id = ${id}`;
		res.status(204).end();
	} catch (e) {
		res.status(400).send({ error: e.message, stack: e.stack });
	}
});

app.listen(port, () => {
	console.log(`El servidor está corriendo en http://localhost:${port}`);
});
