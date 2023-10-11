export interface IDatabase {
    check_connection(): Promise<void>;
    disconnect(): Promise<void>;
    query(queryString: string): Promise<any>;
    createUser(username: string, email: string, password: string): Promise<void>;
    findUserByUsername(username: string): Promise<any | null>;
}