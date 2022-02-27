import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Models/Produto';
import { ProdutoService } from 'src/app/Services/Produto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loja-pesquisa',
  templateUrl: './loja-pesquisa.component.html',
  styleUrls: ['./loja-pesquisa.component.scss']
})
export class LojaPesquisaComponent implements OnInit {

  public baseURL: string;
  public produtos: Produto[] = [];
  constructor(private produtoService: ProdutoService, private router: Router) { 
    this.baseURL = `${environment.UrlAPI}/Imagens/`;
    produtoService.obterTodosProdutos().subscribe(
      produtos => {
        this.produtos = produtos;
      }, e => {
        console.log(e.error);
      })
  }

  ngOnInit(): void {
  }

  abrirProduto(produto: Produto) {
    sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    this.router.navigate(['/loja-produto']);
  }

}