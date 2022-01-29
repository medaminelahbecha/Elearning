import { Enseignant } from "./enseignant";
import { User } from "./user";

export class Commentaire {
    _id : string;
    description : string;
    enseignant :Enseignant;
    user :User;
    date : Date ;
    

}
