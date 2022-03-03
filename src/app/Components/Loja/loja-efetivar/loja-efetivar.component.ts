import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemPedido } from 'src/app/Models/ItemPedido';
import { Pedido } from 'src/app/Models/Pedido';
import { Produto } from 'src/app/Models/Produto';
import { PedidoService } from 'src/app/Services/pedido.service';
import { UsuarioService } from 'src/app/Services/Usuario.service';
import { environment } from 'src/environments/environment';
import { LojaCarrinhoComprasComponent } from '../loja-carrinho-compras/loja-carrinho-compras.component';

@Component({
  selector: 'app-loja-efetivar',
  templateUrl: './loja-efetivar.component.html',
  styleUrls: ['./loja-efetivar.component.scss']
})
export class LojaEfetivarComponent implements OnInit {

  public produtos: Produto[] = [];
  public total?: number;
  public baseURL?: string;
  public carrinhoCompras: LojaCarrinhoComprasComponent = new LojaCarrinhoComprasComponent;
  constructor(private usuarioServico: UsuarioService, private pedidoServico: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.baseURL = `${environment.UrlAPI}/Imagens/`;
    this.carrinhoCompras = new LojaCarrinhoComprasComponent();
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();
  }

  atualizarPreco(produto: Produto, event: any) {

    let quantidade = event.target.valueAsNumber;

    if (!produto.precoOriginal)
        produto.precoOriginal = produto.preco;

    if (quantidade <= 0) {
        quantidade = 1;
        produto.quantidade = quantidade;
    }

    produto.preco = produto.precoOriginal! * quantidade;

    this.carrinhoCompras.atualizar(this.produtos);
    this.atualizarTotal();
  }

  remover(produto: Produto) {
    this.carrinhoCompras.removerProduto(produto);
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();
  }

  atualizarTotal() {
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco!, 0);
  }

  efetivarCompra() {
    this.pedidoServico.efetivarCompra(this.criarPedido())
        .subscribe(
            pedidoId => {
                console.log(pedidoId);
                sessionStorage.setItem("pedidoId", pedidoId.toString());
                this.produtos = [];
                this.carrinhoCompras.limparCarrinhoCompras();
                this.router.navigate(["/compra-realizada-sucesso"]);
            },
            e => {
                console.log(e.error);
          });
  }

  criarPedido(): Pedido
  {
    let pedido = new Pedido();
    pedido.usuarioId = this.usuarioServico.usuario.id;
    pedido.cep = "122323";
    pedido.cidade = "Sao Paulo";
    pedido.estado = "Sao Paulo ";
    pedido.dataPrevisaoEntrega = new Date();
    pedido.formaPagamentoId = 1;
    pedido.numeroEndereco = 12;
    pedido.enderecoCompleto = "akjdhajsdhajshdjas";

    this.produtos = this.carrinhoCompras.obterProdutos();

    for (let produto of this.produtos) {
      let itemPedido = new ItemPedido();
      itemPedido.produtoId = produto.id;

      if (!produto.quantidade)
          produto.quantidade = 1;
      itemPedido.quantidade = produto.quantidade;

      pedido.itensPedido.push(itemPedido);
    }

    return pedido;
  }

}
