import { cursos, tableCursos } from "../index";

const mostrarMensajesListado = () => {
    const listaCursos = document.querySelector("#lista-cursos");
    if (cursos.listado.length >= 1) {
        let cuenta = 0;

        cursos.listado.forEach((curso) => {
            //Si un curso solo ha sido agregado 1 vez, la vuenta general solo aumenta 1
            //Caso contrario se sumaran todos los cursos que hayan sido agregados (aunque sean el mismo)
            curso.cantidad === 1 ? cuenta++ : (cuenta += curso.cantidad);
        });

        const cuentaCursos = document.createElement("p");
        cuentaCursos.classList.add("cuenta-cursos", "visible");
        cuentaCursos.textContent = `Tienes ${cuenta} ${cuenta === 1 ? "curso" : "cursos"} pendientes por comprar!`;
        listaCursos.appendChild(cuentaCursos);
        cursos.crearHTMLListado();
    } else {
        tableCursos.classList.remove('visible');
        tableCursos.classList.add('hidden');
        const buySomethingParagraph = document.createElement("p");
        buySomethingParagraph.textContent =
            "Oh no! Parece que aun no agregas nada a tu carrito!";
        listaCursos.appendChild(buySomethingParagraph);
    }
};

export default mostrarMensajesListado;