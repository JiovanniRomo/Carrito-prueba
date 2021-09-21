import Cursos from "./models/Cursos";
import "./styles.scss";

export const cursos = new Cursos();


document.addEventListener("DOMContentLoaded", () => {
    //Obtenemos la referencia al padre contenedor de nuestros cursos
    const listaCursos = <HTMLDivElement>document.querySelector("#lista-cursos");
    const tableCursos = <HTMLDivElement>document.querySelector(".carrito-cursos");
    const listaCarritoTable = <HTMLTableElement> document.querySelector('#lista-carrito');

    const cargarListeners = () => {
        listaCursos.addEventListener("click", agregarCurso);
        listaCarritoTable.addEventListener('click', eliminarItem);
    };

    cargarListeners();

    //Creamos el listado de cursos

    //Obtenemos los cursos guardados en el localStorage
    const cursosEnStorage = JSON.parse(localStorage.getItem("carrito"));

    //Si el usuario ya ha agregado articulos al carrito, los cargamos en su listado para mostrarlo
    if (cursosEnStorage) {
        cursos.cargarCursosLocalStorage(cursosEnStorage);
    }

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

    mostrarMensajesListado();

    function agregarCurso(e) {
        //Prevenimos el evento por default (reedireccionar)
        e.preventDefault();

        //Prevenimos el event bubbling
        if (e.target.classList.contains("agregar-carrito")) {
            const cursoSeleccionado: HTMLDivElement =
                e.target.parentElement.parentElement;
            leerCurso(cursoSeleccionado);
        }
    }

    function eliminarItem(e) {
        e.preventDefault();

        if(e.target.classList.contains('borrar-curso')) {
            const cursoId = parseInt(e.target.getAttribute('data-id'));
            cursos.eliminarCurso(cursoId);
            window.location.reload();
        }
    }

    function leerCurso(curso: HTMLDivElement) {
        //Creamos un obj en el que asignamos o extraemos solo los DATOS del curso seleccionado
        const data = {
            img: curso.querySelector("img").src,
            titulo: curso.querySelector(".info--title").textContent,
            profesor: curso.querySelector("span").textContent,
            precio: curso.querySelector('.info--precio span').textContent,
            cantidad: 1,
            id: parseInt(curso.getAttribute("data-id")),
        };

        //Comprobamos si el curso que esta agregando el usuario ya existe en el carrito
        const existe = cursos.listado.some((curso) => curso.id === data.id);

        //Si un curso ya ha sido agregado, actualizamos la cantidad, NO lo volvemos a agregar
        if (existe) {
            cursos.listado = cursos.listado.map((curso) => {
                if (curso.id === data.id) {
                    curso.cantidad++;
                    return curso;
                } else {
                    return curso;
                }
            });

            cursos.listado = [...cursos.listado];
        } else {
            //En el method creamos primero un curso con la DATA y despues lo agregamos al listado
            cursos.listado = [...cursos.listado, cursos.agregarCurso(data)];
        }

        window.location.reload();
        cursos.sincronizarStorage();
    }
});
