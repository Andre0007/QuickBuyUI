import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/Usuario.service';
import { LojaCarrinhoComprasComponent } from '../Loja/loja-carrinho-compras/loja-carrinho-compras.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  public carrinhoCompras: LojaCarrinhoComprasComponent = new LojaCarrinhoComprasComponent;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle(){
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.carrinhoCompras = new LojaCarrinhoComprasComponent();
  }

  sair(){
    this.usuarioService.limpar_sessao();
    this.router.navigate(["/"]);
  }

  public usuarioLogado():boolean {
    return this.usuarioService.usuario_autenticado();
  }

  public usuario_administrador(): boolean {
    return this.usuarioService.usuario_administrador();
  }

  get usuario(){
    return this.usuarioService.usuario;
  }

  public temItensCarrinhoCompras(): boolean{
    return this.carrinhoCompras.temItensCarrinhoCompras();
  }

}
