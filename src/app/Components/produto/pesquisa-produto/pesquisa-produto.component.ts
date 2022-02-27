import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Models/Produto';
import { ProdutoService } from 'src/app/Services/Produto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pesquisa-produto',
  templateUrl: './pesquisa-produto.component.html',
  styleUrls: ['./pesquisa-produto.component.scss']
})
export class PesquisaProdutoComponent implements OnInit {

  public baseURL: string;
  public produtos: Produto[] = [];
  
  constructor(private produtoService: ProdutoService, private router: Router) { 
    this.baseURL = `${environment.UrlAPI}/Imagens/`;
    this.produtoService.obterTodosProdutos()
    .subscribe(
      produtos => {
        this.produtos = produtos
      }, e => {
        console.log(e.error);       
      });
  }

  ngOnInit(): void {
  }

  adicionarProduto(){
    sessionStorage.setItem('produtoSession', "");
    this.router.navigate(["/produto"]);
  }

  deletarProduto(produto: Produto) {
    var retorno = confirm("Deseja realmente deletar o produto selecionado ?");
    if (retorno == true) {
      this.produtoService.deletar(produto).subscribe(
        produtos => {          
          this.produtos = produtos;        
        }, e => {
          console.log(e.errors);
      });
    }
  }

  editarProduto(produto: Produto) {
    sessionStorage.setItem('produtoSession', JSON.stringify(produto));
    this.router.navigate(['/produto']);
  }

}
