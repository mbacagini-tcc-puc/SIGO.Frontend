import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AutenticacaoInput } from 'src/app/types/inputs/usuarios/autenticacao.input';
import { ConfirmacaoAutenticacaoInput } from 'src/app/types/inputs/usuarios/confirmacao-autenticacao.input';
import { AutenticacaoOutput } from 'src/app/types/outputs/usuarios/autenticacao.output';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private usuariosService: UsuariosService,
              private toastr: ToastrService,
              private router: Router) { }

  public email: string;
  public senha: string;
  public codigoVerificacao: string;
  public autenticacaoOutput: AutenticacaoOutput;

  ngOnInit() {
  }

  public autenticar() {
    const autenticacaoInput = new AutenticacaoInput();
    autenticacaoInput.email = this.email;
    autenticacaoInput.senha = this.senha;

    this.usuariosService.autenticar(autenticacaoInput).subscribe(result => {
      this.autenticacaoOutput = result;
    }, (error) => {
      if(error.status && error.status == 401) {
        this.toastr.warning('Por favor, verifique o e-mail e senha informados', 'Ops');
      } else {
        this.toastr.error('Algo inesperado ocorreu. Por favor tente mais tarde.', 'Ops');
      }   
    });
  }

  public confirmarCodigo() {
    const confirmacaoInput = new ConfirmacaoAutenticacaoInput();
    confirmacaoInput.codigoVerificacao = this.codigoVerificacao.toString();
    confirmacaoInput.usuarioId = this.autenticacaoOutput.usuarioId;

    this.usuariosService.confirmarCodigo(confirmacaoInput).subscribe(result => {
       localStorage.setItem("token", result.accessToken);
       localStorage.setItem("modulos", result.modulos.join(','));
       this.router.navigate([''])
    }, (error) => {
      if(error.status && error.status == 401) {
        this.toastr.warning('Código informado inválido ou expirado', 'Ops');
      } else {
        this.toastr.error('Algo inesperado ocorreu. Por favor tente mais tarde.', 'Ops');
      }   
    });
  }
}
