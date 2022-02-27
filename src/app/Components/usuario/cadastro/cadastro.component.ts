import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/Services/Usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario;
  public ativar_spinner?: boolean;
  public mensagem?: string;
  public usuarioCadastrado?: boolean;
  constructor(private usuarioServico: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuario = new Usuario(); 
  }

  public cadastrar() {
    this.ativar_spinner = true;

    this.usuarioServico.cadastrarUsuario(this.usuario)
      .subscribe(
        usuarioJson => {
          this.usuarioCadastrado = true;
          this.mensagem = "";
          this.ativar_spinner = false;
        },
        e => {          
          this.mensagem = e.error;
          this.ativar_spinner = false;
        }
      );
  }

}