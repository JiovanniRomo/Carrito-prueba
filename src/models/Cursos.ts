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
            `;

            const botonPagar =  document.createElement('button');
            botonPagar.textContent = 'Pagar todo!';
            botonPagar.classList.add('boton');
            botonPagar.onclick = () => {this.cargarFormularioPago(true)}
            document.querySelector('#lista-carrito').appendChild(cursoContainerCarrito);
            document.querySelector('#lista-carrito').appendChild(botonPagar);
        })

        this.sincronizarStorage();
    }

    private cargarFormularioPago(mostrar: boolean) {
        if(mostrar) {
            const contenedorFormularioRef:HTMLDivElement = document.querySelector('.main .main-formularioPago');
            console.log('pagando...')
            const contenedorForm = document.createElement('form');
            contenedorForm.classList.add('main-contenedorPago');

            //Nosotros estamos generando el HTML, asi que no hay problemas de seguridad
            contenedorForm.innerHTML = `
                    <input type="text" placeholder='Nombre completo' required='true' id="formulario-nombre">
                    <input type="text" placeholder="Direccion de facturacion" id="formulario-direccion">
                    <input type="number" placeholder='Numero de tarjeta' required='true' id="formulario-tarjeta">
                    <input type="number" placeholder="CVC" required='true' id="formulario-cvc">
                    <p>Fecha de vencimiento: </p>
                    <input type="date" id="formulario-vencimiento">

                    <button class="main-formularioPago--envio boton">Comprar!</button>
            `;

            contenedorFormularioRef.classList.remove('hidden');
            contenedorFormularioRef.appendChild(contenedorForm);
        }
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