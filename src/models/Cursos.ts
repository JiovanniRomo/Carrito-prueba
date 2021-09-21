import Curso from "./Curso";
import ui from "./UI";

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
        const curso = new Curso(img, titulo, profesor, parseInt(precio), cantidad, id)
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

        ui.limpiarHTML();
        ui.crearHTMLListado();
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

    public calcularTotal(): number {
        let total = 0;
        this.listado.forEach( item => {
            const { cantidad, precio } = item;

            (cantidad === 1) ? total+= precio : total += cantidad * precio;
        })
        return total;
    }

    public sincronizarStorage = () => {
        localStorage.setItem("carrito", JSON.stringify(this.listado));
    };
}

export default Cursos;