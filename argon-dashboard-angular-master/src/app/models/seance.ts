import { Cours } from "./cours";
import { Enseignant } from "./enseignant";
import { Lesson } from "./lesson";
import { User } from "./user";

export class Seance {
  [x: string]: any;
  _id: string;
  cours: Cours;
  enseignant: Enseignant;
  user: User;
  dateDebut: Date;
  dateFin: Date;
  lesson: Lesson;
  resume: string;
  presence: string;
}
