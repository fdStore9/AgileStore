export class Usuario {
    static fromFirebase(data: any): Usuario | null {
        if (!data) {
            return null;
        }
        
        const {
            email,
            uid,
            nombre,
            apellido,
            rol,
            password,
            phone,
            website,
            skills,
            experience,
            hourlyRate,
            totalProjects,
            englishLevel,
            availability,
            bio
        } = data;

        return new Usuario(
            uid,
            nombre,
            email,
            apellido,
            rol,
            password,
            phone,
            website,
            skills,
            experience,
            hourlyRate,
            totalProjects,
            englishLevel,
            availability,
            bio
        );
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
        public apellido: string,
        public rol: string,
        public password: string,
        public phone?: string,
        public website?: string,
        public skills?: {
            webDesigner?: boolean,
            webDeveloper?: boolean,
            wordpress?: boolean,
            woocommerce?: boolean,
            php?: boolean
        },
        public experience?: string,
        public hourlyRate?: string,
        public totalProjects?: number,
        public englishLevel?: string,
        public availability?: string,
        public bio?: string
    ) { }
}
