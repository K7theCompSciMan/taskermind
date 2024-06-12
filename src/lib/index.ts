// place files you want to import through the `$lib` alias in this folder.
export type {Task} from '../xata';
export type {User} from '../xata';
export type {Event} from '../xata';
export type SessionUser = { 
    id: string;
    email: string;
    username: string;
}