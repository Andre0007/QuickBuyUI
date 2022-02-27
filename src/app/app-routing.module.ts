import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LojaCompraRealizadaComponent } from './Components/Loja/loja-compra-realizada/loja-compra-realizada.component';
import { LojaEfetivarComponent } from './Components/Loja/loja-efetivar/loja-efetivar.component';
import { LojaProdutoComponent } from './Components/Loja/loja-produto/loja-produto.component';
import { PesquisaProdutoComponent } from './Components/produto/pesquisa-produto/pesquisa-produto.component';
import { ProdutoComponent } from './Components/produto/produto.component';
import { CadastroUsuarioComponent } from './Components/usuario/cadastro/cadastro.component';
import { LoginComponent } from './Components/usuario/login/login.component';
import { GuardaRotas } from './Utils/GuardaRotas.routing';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'produto', component: ProdutoComponent, canActivate:[GuardaRotas] },
  { path: 'entrar', component: LoginComponent },
  { path: 'novo-usuario', component: CadastroUsuarioComponent },
  { path: 'pesquisa-produto', component: PesquisaProdutoComponent, canActivate:[GuardaRotas] },
  { path: 'loja-produto', component: LojaProdutoComponent },
  { path: 'loja-efetivar', component: LojaEfetivarComponent, canActivate:[GuardaRotas] },
  { path: 'compra-realizada-sucesso', component: LojaCompraRealizadaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
