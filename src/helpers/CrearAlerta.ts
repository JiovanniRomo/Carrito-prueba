type alerta = 'succed' | 'error';
export const crearAlerta = (type: alerta, message: string) => {

    const contenedor = document.querySelector('.main-formularioPago');
    const divAlert = document.createElement('div');
    const paragraphAlert = document.createElement('p');
    paragraphAlert.textContent = message;

    divAlert.appendChild(paragraphAlert);

    if(type === 'succed') {
        console.log(`all ok: ${message}`);
        divAlert.classList.add('success');

        //Simular el tiempo de espera de un API
        setTimeout(() => {
            contenedor.appendChild(divAlert);
            setTimeout(() => {
                contenedor.removeChild(divAlert);

                //Como el usuario ya ha pagado todo, borramos los items de su carrito
                localStorage.removeItem('carrito');
                window.location.reload();       
            }, 2000)
        }, 2000)

    } else {
        console.log('Oh no :(');
        divAlert.classList.add('error');

        setTimeout(() => {
            contenedor.append(divAlert);
            setTimeout(() => {
                contenedor.removeChild(divAlert);
            }, 5000)
        }, 2000)
    }
}