import { cursos } from "..";

//Almacenamos los productos que el usuario haya guardado en su carrito de compras
const sincronizarStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(cursos.listado));
};

export default sincronizarStorage; 