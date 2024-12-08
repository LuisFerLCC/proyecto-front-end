const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const btn = document.getElementById("btn");
let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let mensaje = document.getElementById("mensaje");

btn.addEventListener("click", postMensaje);

async function postMensaje(event) {
	event.preventDefault();

	if (!nombre.value) return inputFaltante("nombre");
	if (!correo.value) return inputFaltante("correo electrónico");
	if (!correoRegex.test(correo.value))
		return inputInvalido("correo electrónico");
	if (!mensaje.value) return inputFaltante("mensaje");

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

		Swal.fire({
			icon: "success",
			title: "Mensaje enviado",
			text: "Tu mensaje ha sido enviado con éxito",
		});
	} catch (error) {
		console.error(error);

		Swal.fire({
			icon: "error",
			title: "Se ha producido un error",
			text: "Revisa tu conexión a internet y vuelve a intentarlo.",
		});
	}
}

function inputFaltante(nombre) {
	Swal.fire({
		icon: "question",
		title: "Información incompleta",
		text: `Por favor, ingresa tu ${nombre}.`,
	});
}

function inputInvalido(nombre) {
	Swal.fire({
		icon: "error",
		title: "Información inválida",
		text: `Por favor, ingresa un ${nombre} válido.`,
	});
}
