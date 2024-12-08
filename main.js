const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const btn = document.getElementById("btn");
let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let mensaje = document.getElementById("mensaje");

btn.addEventListener("click", postMensaje);

async function postMensaje(event) {
	event.preventDefault();

	if (!nombre.value) return alert("Por favor, ingresa tu nombre.");
	if (!correo.value)
		return alert("Por favor, ingresa tu correo electrónico.");
	if (!correoRegex.test(correo.value))
		return alert("Por favor, ingresa un correo electrónico válido.");
	if (!mensaje.value) return alert("Por favor, ingresa el mensaje.");

	let data = {
		nombre: nombre.value,
		correo: correo.value,
		mensaje: mensaje.value,
	};

	try {
		const response = await fetch("http://127.0.0.1:3000/mensajes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok)
			throw new Error(
				`${response.status} ${response.statusText}: ${JSON.stringify(
					await response.json()
				)}`
			);

		nombre.value = "";
		correo.value = "";
		mensaje.value = "";

		alert("Mensaje enviado correctamente.");
	} catch (error) {
		console.error(error);

		alert(
			"Se ha producido un error. Revisa tu conexión a internet y vuelve" +
				" a intentarlo."
		);
	}
}
