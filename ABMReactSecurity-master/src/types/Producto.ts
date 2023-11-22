export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precioVenta: number;
    costo: number;
    stockActual: number;
    stockMinimo: number;
}