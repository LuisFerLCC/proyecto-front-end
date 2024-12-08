const loginForm = document.querySelector("#login");
const page = document.querySelector("#page");

let correo = "";
let contrasena = "";
let mensajes = [];

loginForm.addEventListener("submit", login);

async function login(event) {
	event.preventDefault();

	correo = loginForm.correo.value;
	contrasena = loginForm.contrasena.value;

	const usuario = {
		correo,
		contrasena,
	};

	try {
		const response = await fetch("http://127.0.0.1:3000/get-mensajes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(usuario),
		});
		const body = await response.json();

		if (!response.ok) throw new Error(body.error);

		actualizarMensajes(body);
		Swal.fire({
			icon: "success",
			title: "Inicio de sesión correcto",
			text: "Has iniciado sesión correctamente",
		});
	} catch (error) {
		console.error(error);

		Swal.fire({
			icon: "error",
			title: "Se ha producido un error",
			text: error.message,
		});
	}
}

function actualizarMensajes(nuevosMensajes) {
	mensajes = nuevosMensajes;

	if (mensajes.length === 0) {
		page.innerHTML = `
			<div class="no-messages">
				<h2>No hay mensajes pendientes.</h2>
				<p>Vuelve más tarde.</p>
			</div>
		`;
		return;
	}

	const mensajesHTML = mensajes.map(
		mensaje => `
			<div class="card">
				<div class="card-body">
					<h2 class="card-title name">${mensaje.nombre}</h2>
					<a href="mailto:${mensaje.correo}">${mensaje.correo}</a>
					<div class="hr" role="separator">
						<div class="hr-line"></div>
						<img
							src="src/iconos/sol.svg"
							aria-hidden="true"
							width="15"
							height="30"
						/>
						<div class="hr-line"></div>
					</div>

					<p>
						${mensaje.mensaje.replace(/\n/g, "<br>")}
					</p>

					<div class="center-container">
						<button
							class="btn btn-danger"
							onclick="eliminarMensaje(${mensaje.id})"
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		`
	);

	page.innerHTML = mensajesHTML.join("");
}

async function eliminarMensaje(id) {
	try {
		const usuario = {
			correo,
			contrasena,
		};

		const response = await fetch(`http://127.0.01:3000/mensajes/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(usuario),
		});

		if (!response.ok) throw new Error(await response.text());

		const nuevosMensajes = mensajes.filter(mensaje => mensaje.id !== id);
		actualizarMensajes(nuevosMensajes);

		Swal.fire({
			icon: "success",
			title: "Mensaje eliminado",
			text: "El mensaje ha sido eliminado correctamente",
		});
	} catch (error) {
		console.error(error);

		Swal.fire({
			icon: "error",
			title: "Se ha producido un error",
			text: error.message,
		});
	}
}
