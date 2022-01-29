import { Enseignant } from "./enseignant";
import { User } from "./user";

export class Seance {
    _id : string;
    name : string;
    enseignant :Enseignant;
    user :User;
    dateDebut : Date ;
    dateFin : Date ;
    type : string;

}
