
interface _hospitalMedico{

    _id : string;
    name: string;
}

interface _usuarioMedico{
    _id : string;
    name: string;
    email: string;
}



export class Medico {
    
    constructor(
        public _id : string,
        public name: string,
        public img?: string,
        //implementamos interfaz del usuario
        public usuario?: _usuarioMedico,
        //implementamos interfaz del hospital
        public hospital?: _hospitalMedico
    ){}

}