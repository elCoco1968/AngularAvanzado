//Interface para crear usuarios

export interface RegisterForm{
    name: string;
    email: string;
    password: string;
    password2: string;
    terminos: boolean;
}