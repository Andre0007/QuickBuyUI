import { ItemPedido } from "./ItemPedido";

export class Pedido{
    id?: number;    
    dataPedido: Date;
    usuarioId?: number;
    dataPrevisaoEntrega?: Date;
    cep?: string;
    estado?: string;
    cidade?: string;
    enderecoCompleto?: string;
    numeroEndereco?: number;
    formaPagamentoId?: number;
    itensPedido: ItemPedido[];

    constructor() {
        this.dataPedido = new Date();
        this.itensPedido = [];
    }
}