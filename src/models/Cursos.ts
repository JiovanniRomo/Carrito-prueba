import Curso from "./Curso";

interface CursoInterace {
    img: string,
    titulo: string,
    profesor: string,
    precio: string,
    cantidad: number
    id: number
}

class Cursos {
    public listado: Curso[];

    constructor() {
        this.listado = [];
    }

    public agregarCurso(data: CursoInterace): Curso {
        const { img, titulo, profesor, precio, id, cantidad } = data;
        const curso = new Curso(img, titulo, profesor, precio, cantidad, id)
        this.listado = [...this.listado, curso];
        return curso;
    }

    public cargarCursosLocalStorage(cursos: Curso[]) {
        cursos.forEach( curso => {
            this.listado = [...this.listado, curso];
        })
    }

    public eliminarCurso(id: number) {
        const cursoDoble = this.listado.filter( curso => curso.id == id);
        const { cantidad } = cursoDoble[0];

        (cantidad > 1)
            ? this.comprobarCantidad(id)
            : this.listado = this.listado.filter( curso => curso.id !== id);

        this.limpiarHTML();
        this.crearHTMLListado();
    }

    private comprobarCantidad(cursoId: number){
        console.log('working')
        this.listado = this.listado.map( curso => {
            if(curso.id === cursoId) {
                curso.cantidad--;
                return curso;
            } else {
                return curso;
            }
        })
        this.listado = [...this.listado];
    }

    public crearHTMLListado() {

        this.limpiarHTML();

        this.listado.forEach( curso => {
            const { img, titulo, precio, cantidad, id } = curso;
            const cursoContainerCarrito = document.createElement("tr");

            //La data proviene de nosotros, de modo que no es inseguro el uso de innerHTML
            cursoContainerCarrito.innerHTML = `
                <td> 
                    <img src="${img}" alt="${titulo}" width="90" />
                </td>
                <td> 
                    ${titulo}
                </td>
                <td> 
                    ${precio}
                </td>
                <td> 
                    ${cantidad}
                </td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${id}">X</a>
                </td>
            `
            document.querySelector('#lista-carrito').appendChild(cursoContainerCarrito);
        })

        this.sincronizarStorage();
    }

    public sincronizarStorage = () => {
        localStorage.setItem("carrito", JSON.stringify(this.listado));
    };

    private limpiarHTML() {
        const contenedorCarrito = document.querySelector('#lista-carrito tbody'); 
        while(contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }
}

export default Cursos;