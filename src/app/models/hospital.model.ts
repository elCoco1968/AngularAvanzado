//Vamos a implementar el modelo aca diferente al de usuarios solo con fines educativos de obtener diferentes formas de implementar el codigo
//Dato curioso, cuando usamos clases y cuando interfaces? usamos interfaces cuando no necesitemos metodos, aunque normalmente en crud utulizamos clases



//usualmente el _ indica que es algo privado
interface _hospitalUser{
    name: string;
    _id: string;
    img: string;
}



export class Hospital {

    constructor(
        public name: string,
        public _id?:string,
        public img?: string,
        //implementamos la interface para ser mas especificos a la hora de la creacion
        public usuario?: _hospitalUser,
    ){}

}