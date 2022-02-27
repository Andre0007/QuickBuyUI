import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/Services/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario?: Usuario = new Usuario;
  public returnUrl?: string;
  public mensagem?: string;
  public ativar_spinner?: boolean;
  constructor(private router: Router, private  activatedRouter: ActivatedRoute, private usuarioService: UsuarioService) {    
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams["returnUrl"];
    this.usuario = new Usuario();
  }

  entrar(){
    this.ativar_spinner = true;
    this.usuarioService.verificarUsuario(this.usuario!).subscribe(usuario_json => {
      // essa linha será executada no caso de retorno sem erros                          
      this.usuarioService.usuario = usuario_json;

      if (this.returnUrl == null) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate([this.returnUrl]);
      }
    },
    err => {
      console.log(err.error);
      this.mensagem = err.error;
      this.ativar_spinner = false;
    });
  }

}