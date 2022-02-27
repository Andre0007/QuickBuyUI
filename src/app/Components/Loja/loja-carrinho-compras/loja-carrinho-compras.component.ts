import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/Models/Produto';

@Component({
  selector: 'app-loja-carrinho-compras',
  templateUrl: './loja-carrinho-compras.component.html',
  styleUrls: ['./loja-carrinho-compras.component.scss']
})
export class LojaCarrinhoComprasComponent implements OnInit {

  public produtos: Produto[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  adicionar(produto: Produto){
    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
    if(!produtoLocalStorage){
      // não existe item do localStorage
      this.produtos.push(produto);
      localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
    }else{
      //se existir pelo menos um unico item
      this.produtos = JSON.parse(produtoLocalStorage);
      let idProduto = produto.id;
      let obj = this.produtos.find(function(_obj){
        return _obj.id == idProduto;
      });

      if(obj == undefined && obj == null)
        this.produtos.push(produto);
            
      localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
    }
  }

  obterProdutos() : Produto[]{
    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
    if(produtoLocalStorage)
      return JSON.parse(produtoLocalStorage);      
    return this.produtos;
  }

  atualizar(produtos: Produto[]) {
    localStorage.setItem("produtoLocalStorage", JSON.stringify(produtos));
  }

  limparCarrinhoCompras() {
      localStorage.setItem("produtoLocalStorage", "");
  }

  removerProduto(produto: Produto){
    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
    if(produtoLocalStorage){
      this.produtos = JSON.parse(produtoLocalStorage);
      this.produtos =this.produtos.filter(p => p.id != produto.id);
      localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
    }
  }

  temItensCarrinhoCompras(): boolean {
    var itens = this.obterProdutos();
    return (itens.length > 0);
  }

}
