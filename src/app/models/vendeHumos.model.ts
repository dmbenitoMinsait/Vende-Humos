export interface vendeHumos{
    id?: string;
    nombre?: string;
    descripcion?: string;
    categorias?: Array<string>;
    fechaAlta?: Date;
    urlImagen: string;
    votadoPor: Array<string>;
    usuarioId: number;
}