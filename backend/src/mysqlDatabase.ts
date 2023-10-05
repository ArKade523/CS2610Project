import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { IDatabase } from './databaseInterface';

export class MySQLDatabase implements IDatabase {
    private pool: mysql.Pool;

    constructor(private config: mysql.ConnectionOptions) {
        this.pool = mysql.createPool(this.config);

        // Graceful shutdown
        process.on('exit', () => {
            console.log('Closing database pool.');
            this.pool.end();
        });
    }

    async connect(): Promise<void> {
        // With connection pools, you don't typically "connect" or "disconnect".
        // The pool handles this for you, giving you a connection when needed.
        // However, if you want to ensure there's a valid connection for some reason:
        const connection = await this.pool.getConnection();
        connection.release();
    }

    async disconnect(): Promise<void> {
        await this.pool.end();
    }

    async query(queryString: string, values?: any[]): Promise<any> {
        return this.pool.query(queryString, values);
    }

    async createUser(username: string, email: string, password: string): Promise<void> {
        if (!this.connect()) {
            throw new Error("Not connected to the database");
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await this.query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        );
    }

    async findUserByUsername(username: string): Promise<any | null> {
        if (!this.connect()) {
            throw new Error("Not connected to the database");
        }

        const [rows] = await this.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    }
}
