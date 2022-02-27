import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TruncateModule } from 'ng2-truncate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LojaCarrinhoComprasComponent } from './Components/Loja/loja-carrinho-compras/loja-carrinho-compras.component';
import { LojaCompraRealizadaComponent } from './Components/Loja/loja-compra-realizada/loja-compra-realizada.component';
import { LojaEfetivarComponent } from './Components/Loja/loja-efetivar/loja-efetivar.component';
import { LojaPesquisaComponent } from './Components/Loja/loja-pesquisa/loja-pesquisa.component';
import { LojaProdutoComponent } from './Components/Loja/loja-produto/loja-produto.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { PesquisaProdutoComponent } from './Components/produto/pesquisa-produto/pesquisa-produto.component';
import { ProdutoComponent } from './Components/produto/produto.component';
import { CadastroUsuarioComponent } from './Components/usuario/cadastro/cadastro.component';
import { LoginComponent } from './Components/usuario/login/login.component';
import { PedidoService } from './Services/pedido.service';
import { ProdutoService } from './Services/Produto.service';
import { UsuarioService } from './Services/Usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    PesquisaProdutoComponent,
    LojaPesquisaComponent,
    LojaProdutoComponent,
    LojaEfetivarComponent,
    LojaCarrinhoComprasComponent,
    LojaCompraRealizadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    TruncateModule,
    FormsModule
  ],
  providers: [UsuarioService, ProdutoService, PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
