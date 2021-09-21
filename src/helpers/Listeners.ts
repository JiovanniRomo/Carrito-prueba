import { listaCarritoTable, listaCursos } from "../index";
import { agregarCurso, eliminarItem } from "./Cursos_helper";

const cargarListeners = () => {
    listaCursos.addEventListener("click", agregarCurso);
    listaCarritoTable.addEventListener('click', eliminarItem);
};

export default cargarListeners;