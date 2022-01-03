export interface Usuario{
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    rol?: string;
    vendeHumosVotados?: Array<string>;
    urlImagen?: string;
}

