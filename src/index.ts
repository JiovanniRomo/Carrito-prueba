import cargarListeners from "./helpers/Listeners";
import mostrarMensajesListado from "./helpers/mostrarMensajesListado";
import Cursos from "./models/Cursos";
import "./styles.scss";

export const cursos = new Cursos();

//Obtenemos la referencia al padre contenedor de nuestros cursos
export const listaCursos = <HTMLDivElement>document.querySelector("#lista-cursos");
export const tableCursos = <HTMLDivElement>document.querySelector(".carrito-cursos");
export const listaCarritoTable = <HTMLTableElement> document.querySelector('#lista-carrito');

document.addEventListener("DOMContentLoaded", () => {
    
    cargarListeners();

    //Creamos el listado de cursos

    //Obtenemos los cursos guardados en el localStorage
    const cursosEnStorage = JSON.parse(localStorage.getItem("carrito"));

    //Si el usuario ya ha agregado articulos al carrito, los cargamos en su listado para mostrarlo
    if (cursosEnStorage) {
        cursos.cargarCursosLocalStorage(cursosEnStorage);
    }


    mostrarMensajesListado();
});
