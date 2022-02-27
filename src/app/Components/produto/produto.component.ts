import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Models/Produto';
import { ProdutoService } from 'src/app/Services/Produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  public produto: Produto = new Produto();
  public arquivoSelecionado: File | undefined;
  public ativar_spinner?: boolean;
  public mensagem?: string;

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    var produtoSession = sessionStorage.getItem('produtoSession')
    if (produtoSession) {
      this.produto = JSON.parse(produtoSession);
    } else {
      this.produto = new Produto();
    }    
  }

  inputChange(files: FileList) {
    this.arquivoSelecionado = files.item(0)!;
    this.ativar_spinner = true;
    this.produtoService.enviarArquivo(this.arquivoSelecionado)
      .subscribe(
        nomeArquivo => {
          this.produto.nomeArquivo = nomeArquivo;          
          console.log(nomeArquivo);
          this.ativar_spinner = false;
        },
        e => {
          console.log(e.error);
          this.ativar_spinner = false;
        });
  }

  cadastrar() {
    this.ativarEspera();

    if(this.produto.id != null || this.produto.id != undefined){
      this.produtoService.alterar(this.produto)
      .subscribe(
        produtoJson => {          
          console.log(produtoJson);
          this.desativarEspera();
          this.router.navigate(['/pesquisa-produto']);
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.desativarEspera();
        } 
      );
    }else{
      this.produtoService.cadastrar(this.produto)
      .subscribe(
        produtoJson => {          
          console.log(produtoJson);
          this.desativarEspera();
          this.router.navigate(['/pesquisa-produto']);
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.desativarEspera();
        } 
      );
    }    
  }
  
  public ativarEspera() {
    this.ativar_spinner = true;
  }

  public desativarEspera() {
    this.ativar_spinner = false;
  }

}