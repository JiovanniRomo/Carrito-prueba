import Cursos from "./models/Cursos";
import "./styles.scss";

document.addEventListener("DOMContentLoaded", () => {
    //Obtenemos la referencia al padre contenedor de nuestros cursos
    const listaCursos = <HTMLDivElement>document.querySelector("#lista-cursos");

    const cargarListeners = () => {
        listaCursos.addEventListener("click", agregarCurso);
    };

    cargarListeners();

    //Creamos el listado de cursos
    const cursos = new Cursos();

    //Obtenemos los cursos guardados en el localStorage
    const cursosEnStorage = JSON.parse(localStorage.getItem('carrito'));

    //Si el usuario ya ha agregado articulos al carrito, los cargamos en su listado para mostrarlo
    if (cursosEnStorage) {
        cursos.cargarCursosLocalStorage(cursosEnStorage);
    }

    const cargarCarritoHTML = () => {
        if(cursos.listado !== []) {
            let cuenta = 0;

            cursos.listado.forEach ( curso => {
                (curso.cantidad === 1) ? cuenta++ : cuenta += curso.cantidad;
            })

            const cuentaCursos = document.createElement('p');
            cuentaCursos.textContent = `Tienes ${cuenta} ${(cuenta === 1) ? 'curso' : 'cursos'} pendientes por comprar!`;
            document.querySelector('#lista-cursos').appendChild(cuentaCursos);
        } else {
            const buySomethingParagraph = document.createElement('p');
            buySomethingParagraph.textContent = 'Oh no! Parece que aun no agregas nada a tu carrito!';

            document.querySelector('#lista-cursos').appendChild(buySomethingParagraph);
        }
    }

    cargarCarritoHTML();

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

    const sincronizarStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(cursos.listado));
    }

    function leerCurso(curso: HTMLDivElement) {
        //Creamos un obj en el que asignamos o extraemos solo los DATOS del curso seleccionado
        const data = {
            img: curso.querySelector("img").src,
            titulo: curso.querySelector(".info--title").textContent,
            profesor: curso.querySelector("span").textContent,
            precio: curso.querySelector("p").textContent,
            cantidad: 1,
            id: parseInt(curso.getAttribute("data-id")),
        };

        //Comprobamos si el curso que esta agregando el usuario ya existe en el carrito
        const existe = cursos.listado.some(curso => curso.id === data.id);
        
        //Si un curso ya ha sido agregado, actualizamos la cantidad, NO lo volvemos a agregar
        if(existe) {
            cursos.listado = cursos.listado.map( curso => {
                if(curso.id === data.id) {
                    curso.cantidad++;
                    return curso;
                } else {
                    return curso;
                }
            })

            cursos.listado = [...cursos.listado];
        } else {
            //En el method creamos primero un curso con la DATA y despues lo agregamos al listado
            cursos.listado = [...cursos.listado, cursos.agregarCurso(data)];
        }

        window.location.reload();
        sincronizarStorage();
    }
});
