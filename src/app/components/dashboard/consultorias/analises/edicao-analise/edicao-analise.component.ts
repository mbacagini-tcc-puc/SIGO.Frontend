import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConsultoriasService } from 'src/app/services/consultorias.service';
import { EdicaoAnaliseInput } from 'src/app/types/inputs/consultorias/edicao-analise.input';

@Component({
  selector: 'app-edicao-analise',
  templateUrl: './edicao-analise.component.html',
  styleUrls: ['./edicao-analise.component.scss']
})
export class EdicaoAnaliseComponent implements OnInit {

  public analise: EdicaoAnaliseInput;

  constructor(private consultoriasService: ConsultoriasService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.analise = new EdicaoAnaliseInput();
  }

  isInclusao(): boolean {
    return !this.analise.id;
  }

  salvarRascunho() {
    this.analise.dataPublicacao = null;
  }

  publicar() {
    this.analise.dataPublicacao = new Date();
  }

  salvar() {
    if(this.analise.id) {
      this.consultoriasService.atualizarAnalise(this.analise).subscribe(() => {
        this.toastr.success('Análise atualizada com sucesso', 'Sucesso');
      }, () => {
        this.toastr.error('Não foi possível salvar a análise. Tente novamente mais tarde', 'Ops');
      });
    } else {
      this.consultoriasService.inserirAnalise(this.analise).subscribe(id => {
        this.toastr.success('Análise criada com sucesso', 'Sucesso');
        this.analise.id = id;
      }, () => {
        this.toastr.error('Não foi possível salvar a análise. Tente novamente mais tarde', 'Ops');
      });
    }
  }

}
