import { Cours } from "./cours";

export class Enseignant {
  _id: string;
  email: string;
  cours: Cours;
  name: string;
  password: string;
  phone: string;
  url: string;
  heureDebut: string;
  heureFin: string;
  langue: string[];
}
