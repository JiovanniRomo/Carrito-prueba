class Curso {
    img: string;
    titulo: string;
    profesor: string;
    precio: string;
    cantidad: number;
    id: number;

    constructor(
        img: string,
        titulo: string,
        profesor: string,
        precio: string,
        cantidad: number,
        id: number
    ) {
        this.img = img;
        this.titulo = titulo;
        this.profesor = profesor;
        this.precio = precio;
        this.cantidad = cantidad;
        this.id = id;
    }
}

export default Curso;
