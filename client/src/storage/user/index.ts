import { IUser } from "../../interfaces/IUser";
import LocalStorage from "../LocalStorage";

export const userStorage = new LocalStorage<IUser>();
