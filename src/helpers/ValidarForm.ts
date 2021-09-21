import ui from "../models/UI";

export const validarForm = (e: Event) => {
    e.preventDefault();

    console.log("validando");
    e.preventDefault();

    const nombreForm = document.querySelector(
        ".main-contenedorPago #formulario-nombre"
    ).textContent;
    const direccionForm = document.querySelector(
        ".main-contenedorPago #formulario-direccion"
    ).textContent;
    const tarjetaForm = document.querySelector(
        ".main-contenedorPago #formulario-tarjeta"
    ).textContent;
    const cvcForm = document.querySelector(
        ".main-contenedorPago #formulario-cvc"
    ).textContent;
    const vencimientoForm = document.querySelector(
        ".main-contenedorPago #formulario-vencimiento"
    ).textContent;
    const fechaActual = Date.now();

    if (
        nombreForm.trim().length < 5 ||
        direccionForm.trim().length < 10 ||
        tarjetaForm.trim().length < 10 ||
        cvcForm.trim().length < 3 ||
        parseInt(vencimientoForm) < fechaActual
    ) {

        ui.crearAlerta('error');
    }
};
