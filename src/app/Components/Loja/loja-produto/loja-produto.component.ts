import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Models/Produto';
import { ProdutoService } from 'src/app/Services/Produto.service';
import { environment } from 'src/environments/environment';
import { LojaCarrinhoComprasComponent } from '../loja-carrinho-compras/loja-carrinho-compras.component';

@Component({
  selector: 'app-loja-produto',
  templateUrl: './loja-produto.component.html',
  styleUrls: ['./loja-produto.component.scss']
})
export class LojaProdutoComponent implements OnInit {

  public baseURL: string = "";
  public produto: Produto = new Produto;
  public carrinhoCompras: LojaCarrinhoComprasComponent = new LojaCarrinhoComprasComponent();
  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.baseURL = `${environment.UrlAPI}/Imagens/`;
    this.carrinhoCompras = new LojaCarrinhoComprasComponent();
    var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
    if(produtoDetalhe){
      this.produto = JSON.parse(produtoDetalhe);
    }
  }

  comprar() {
    this.carrinhoCompras.adicionar(this.produto);
    this.router.navigate(["/loja-efetivar"]);
  }

}