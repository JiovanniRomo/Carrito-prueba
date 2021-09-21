import { cursos } from "..";
import { crearAlerta } from "../helpers/CrearAlerta";
class UI {
    constructor() { }

    public cargarFormularioPago(mostrar: boolean) {
        //Nos aseguramos de que el usuario no pueda cargar el formulario mas de 1 vez
        const contenedor = document.querySelectorAll('.main-contenedorPago');

        if (mostrar && contenedor.length === 0) {
            const contenedorFormularioRef: HTMLDivElement = document.querySelector('.main .main-formularioPago');
            const contenedorForm = document.createElement('form');
            contenedorForm.classList.add('main-contenedorPago');
            const total = cursos.calcularTotal();
            console.log(total);

            //Nosotros estamos generando el HTML, asi que no hay problemas de seguridad
            contenedorForm.innerHTML = `
                    <p class="main-contenedorPago--cuenta">Total a pagar: <span>${total} USD</span></p>
                    <input type="text" placeholder='Nombre completo' required='true' id="formulario-nombre">
                    <input type="text" placeholder="Direccion de facturacion" id="formulario-direccion">
                    <input type="number" placeholder='Numero de tarjeta' required='true' id="formulario-tarjeta">
                    <input type="number" placeholder="CVC" required='true' id="formulario-cvc">
                    <a class="main-formularioPago--envio boton" href='#'>Comprar ahora!</a> 
            `;

            contenedorFormularioRef.classList.remove('hidden');
            contenedorFormularioRef.appendChild(contenedorForm);
        }
        const boton = <HTMLAnchorElement>document.querySelector('.main .main-contenedorPago .main-formularioPago--envio');
        boton.addEventListener('click', this.validarForm);
    }

    //Creamos el listado de todos los cursos que el usuario haya agregado a su carrito
    public crearHTMLListado() {
        this.limpiarHTML();

        cursos.listado.forEach(curso => {
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
            // document.querySelector('#lista-carrito').appendChild(botonPagar);
            document.querySelector('#lista-carrito').appendChild(cursoContainerCarrito);
        })

        const botonPagar = document.createElement('button');
        botonPagar.textContent = 'Pagar todo!';
        botonPagar.classList.add('boton');
        botonPagar.onclick = () => { ui.cargarFormularioPago(true) }
        document.querySelector('#lista-carrito').appendChild(botonPagar);

        cursos.sincronizarStorage();
    }

    public validarForm(e: Event) {
        e.preventDefault();

        console.log("validando");

        const nombreForm = <HTMLInputElement>document.querySelector(
            ".main .main-contenedorPago #formulario-nombre"
        );
        const direccionForm = <HTMLInputElement>document.querySelector(
            ".main .main-contenedorPago #formulario-direccion"
        );
        const tarjetaForm = <HTMLInputElement>document.querySelector(
            ".main .main-contenedorPago #formulario-tarjeta"
        );
        const cvcForm = <HTMLInputElement>document.querySelector(
            ".main .main-contenedorPago #formulario-cvc"
        );


        if (
            nombreForm.value.trim().length >= 5 &&
            direccionForm.value.trim().length >= 10 &&
            tarjetaForm.value.trim().length >= 10 &&
            cvcForm.value.trim().length >= 3
        ) {
            crearAlerta('succed', 'Su pago fue registrado con exito, disfrute su compra')
        } else {
            crearAlerta('error', 'Por favor rellene el formulario correctamente y vuelva a intentarlo!')
        }
    }

    public limpiarHTML() {
        const contenedorCarrito = document.querySelector('#lista-carrito tbody');
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }
}

const ui = new UI();
export default ui;