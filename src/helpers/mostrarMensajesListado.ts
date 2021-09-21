import { cursos, tableCursos } from "../index";
import ui from "../models/UI";

const mostrarMensajesListado = () => {
    const listaCursos = document.querySelector("#lista-cursos");
    if (cursos.listado.length >= 1) {
        let cuenta = 0;

        cursos.listado.forEach((curso) => {
            //Si un curso solo ha sido agregado 1 vez, la cuenta general solo aumenta 1
            //Caso contrario se sumaran todos los cursos que hayan sido agregados (aunque sean el mismo)
            curso.cantidad === 1 ? cuenta++ : (cuenta += curso.cantidad);
        });

        const cuentaCursos = document.createElement("p");
        cuentaCursos.classList.add("cuenta-cursos");
        if(cuentaCursos.classList.contains('hidden')) {
            cuentaCursos.classList.remove('hidden');
        }

        //Mensaje personalizado en base a los cursos agregados
        cuentaCursos.textContent = `Tienes ${cuenta} ${cuenta === 1 ? "curso pendiente" : "cursos pendientes"} por comprar!`;
        cuentaCursos.classList.add('main-cuentaCursos');
        listaCursos.appendChild(cuentaCursos);
        ui.crearHTMLListado();
    } else {
        tableCursos.classList.remove('visible');
        tableCursos.classList.add('hidden');
        //En caso de no haber agregado nada, lo indicamos al usuario
        const buySomethingParagraph = document.createElement("p");
        buySomethingParagraph.textContent =
            "Oh no! Parece que aun no agregas nada a tu carrito!";
        buySomethingParagraph.classList.add('main-cuentaCursos');
        listaCursos.appendChild(buySomethingParagraph);
    }
};

export default mostrarMensajesListado;