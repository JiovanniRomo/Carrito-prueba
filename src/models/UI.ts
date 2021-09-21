import { cursos } from "..";
import { validarForm } from "../helpers/ValidarForm";

type Respuesta = 'succed' | 'error';

class UI {
    constructor() {}

    public cargarFormularioPago(mostrar: boolean) {
        //Nos aseguramos de que el usuario no pueda cargar el formulario mas de 1 vez
        const contenedor = document.querySelectorAll('.main-contenedorPago');

        if(mostrar && contenedor.length === 0) {
            const contenedorFormularioRef:HTMLDivElement = document.querySelector('.main .main-formularioPago');
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
                    <a class="main-formularioPago--envio boton" href='#'>Comprar ahora!</a> 
            `;

            contenedorFormularioRef.classList.remove('hidden');
            contenedorFormularioRef.appendChild(contenedorForm);
            const boton = <HTMLAnchorElement> document.querySelector('.main .main-contenedorPago .main-formularioPago--envio');
            boton.addEventListener('click', validarForm);
        }
    }

    public resetearForm() {
        const formulario = <HTMLFormElement> document.querySelector('main-contenedorPago');
        formulario.reset();
        localStorage.removeItem('carrito');
    }

    public crearHTMLListado() {
        this.limpiarHTML();

        cursos.listado.forEach( curso => {
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

        const botonPagar =  document.createElement('button');
        botonPagar.textContent = 'Pagar todo!';
        botonPagar.classList.add('boton');
        botonPagar.onclick = () => {ui.cargarFormularioPago(true)}
        document.querySelector('#lista-carrito').appendChild(botonPagar);

        cursos.sincronizarStorage();
    }

    public crearAlerta(type: Respuesta) {
        if(type === 'error') {
            console.log('something has failed!')
        }
    }

    public limpiarHTML() {
        const contenedorCarrito = document.querySelector('#lista-carrito tbody'); 
        while(contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }
}

const ui = new UI();
export default ui;