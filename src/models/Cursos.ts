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

    agregarCurso(data: CursoInterace): Curso {
        console.log(data);
        const { img, titulo, profesor, precio, id, cantidad } = data;
        const curso = new Curso(img, titulo, profesor, precio, cantidad, id)
        this.listado = [...this.listado, curso];
        return curso;
    }

    cargarCursosLocalStorage(cursos: Curso[]) {
        cursos.forEach( curso => {
            this.listado = [...this.listado, curso];
        })
    }
}

export default Cursos;