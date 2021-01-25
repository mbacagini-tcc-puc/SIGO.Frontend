import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CriacaoUsuarioInput } from 'src/app/types/inputs/usuarios/criacao-usuario.input';
import { ModuloOutput } from 'src/app/types/outputs/usuarios/modulo.output';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  public modulos: ModuloOutput[] = [];
  public usuario: CriacaoUsuarioInput = new CriacaoUsuarioInput();
  public modulosSelecionados: number[] = [];

  constructor(private usuarioService: UsuariosService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.carregarModulos();
  }

  carregarModulos() {
    this.usuarioService.obterModulos().subscribe(modulos => {
      this.modulos = modulos;
    });
  }

  marcarModulo(id : number) {
    if(!this.modulosSelecionados.includes(id))
       this.modulosSelecionados.push(id);
    else 
      this.modulosSelecionados = this.modulosSelecionados.filter(x => x != id);
  }

  criarUsuario() {
    if(this.modulosSelecionados.length == 0 ){
      this.toastr.warning('Por favor selecione pelo menos um módulo', "Aviso");
      return;
    }

    this.usuario.celular = "+55" + this.usuario.celular;
    this.usuario.modulos = this.modulosSelecionados;

    this.usuarioService.criarUsuario(this.usuario).subscribe(() => {
      this.toastr.success('Usuário criado com sucesso!', 'Sucesso');
      this.usuario = new CriacaoUsuarioInput();
      this.modulosSelecionados = [];
      (<HTMLFormElement>document.getElementById("formUsuario")).reset();
    }, () => {
      this.toastr.error('Não foi possível criar o usuário. Por favor tente mais tarde.', 'Ops')
    });
  }
}
