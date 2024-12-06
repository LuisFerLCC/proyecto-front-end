const btn = document.getElementById('btn');
let nombre = document.getElementById('nombre');
let correo = document.getElementById('correo');
let mensaje = document.getElementById('mensaje');

btn.addEventListener('click', postMensaje);

async function postMensaje(event) {
    event.preventDefault();

    let data = {
        Nombre: nombre.value,
        Correo: correo.value,
        Mensaje: mensaje.value
    }
    try {
        const response = await fetch("http://127.0.0.1:3000/insertMensaje", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert("Success:", result);
    }
    catch (error) {
        console.error("Error:", error);
    }
}