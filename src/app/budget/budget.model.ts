import {Client}  from '../clients/client.model';
import {Terceiro}  from '../clients/terceiro.model';

export interface BudgetModel{
    client: Client;
    //type: string;
    //client: string;
    date: string;
    //type: string;
    terceiro: Terceiro;
    vendor: string;
    valorTotal: number;
    discount: number;
    valorComDesconto: number;
    //clientType: string
}