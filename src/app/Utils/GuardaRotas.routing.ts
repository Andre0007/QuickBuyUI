import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { UsuarioService } from '../Services/Usuario.service';

@Injectable({
  providedIn:'root'
})
export class GuardaRotas implements CanActivate{

  constructor(private router: Router, private usuarioServico: UsuarioService){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if(this.usuarioServico.usuario_autenticado())
      return true;

    this.router.navigate(['/entrar'], {queryParams: { returnUrl: state.url } });

    return false;
  }

}
