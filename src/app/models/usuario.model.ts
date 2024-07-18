export class Usuario {
    static fromFirebase(data: any): Usuario | null {
        if (!data) {
            return null;
        }
        
        const { email, uid, nombre, apellido, rol, password } = data;
        return new Usuario(uid, nombre, email, apellido, rol, password);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
        public apellido: string,
        public rol: string,
        public password: string
    ) { }
}
