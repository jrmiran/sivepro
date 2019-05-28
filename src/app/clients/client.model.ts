import {Terceiro} from './terceiro.model';

export interface Client{
    type: string;
    name: string;
    tel: string;
    cel: string;
    email: string;
    address: string;
    terceiro: Terceiro;
}