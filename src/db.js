import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from './config.js';

export const conexion = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,   
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

async function conectar() {
    try {
        await conexion.connect();
        console.log('Conexión establecida');
    } catch (error) {
        throw new Error('Error al conectar a la base de datos:', error.message);
    }
}

conectar().catch(error => console.error(error));