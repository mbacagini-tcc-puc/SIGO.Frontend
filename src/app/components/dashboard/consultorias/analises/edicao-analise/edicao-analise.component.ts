import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultoriasService } from 'src/app/services/consultorias.service';
import { EdicaoAnaliseInput } from 'src/app/types/inputs/consultorias/edicao-analise.input';
import { DetalhamentoAnaliseOutput } from 'src/app/types/outputs/consultorias/detalhamento-analise.output';

@Component({
  selector: 'app-edicao-analise',
  templateUrl: './edicao-analise.component.html',
  styleUrls: ['./edicao-analise.component.scss']
})
export class EdicaoAnaliseComponent implements OnInit {

  public analise: EdicaoAnaliseInput;
  public analiseDetalhada: DetalhamentoAnaliseOutput;

  constructor(private consultoriasService: ConsultoriasService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.analise = new EdicaoAnaliseInput();
    this.analiseDetalhada = new DetalhamentoAnaliseOutput();
    const id = this.route.snapshot.paramMap.get("idAnalise");
    if(id) {
      this.carregarAnalise(parseInt(id));
    }
  }

  carregarAnalise(id: number) {
    this.consultoriasService.obterDetalheAnalise(id).subscribe(detalheAnalise => {
      this.analiseDetalhada = detalheAnalise;
      this.analise.id = detalheAnalise.id;
      this.analise.titulo = detalheAnalise.titulo;
      this.analise.resumo = detalheAnalise.resumo;
    }, () => {
      this.toastr.error('Não foi possível obter os detalhes da análise', 'Ops');
    })
  }

  isInclusao(): boolean {
    return !this.analise.id;
  }

  isEmAndamento():  boolean {
    return !this.analiseDetalhada.dataPublicacao;
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
        this.carregarAnalise(this.analise.id);
      }, () => {
        this.toastr.error('Não foi possível salvar a análise. Tente novamente mais tarde', 'Ops');
      });
    } else {
      this.consultoriasService.inserirAnalise(this.analise).subscribe(id => {
        this.toastr.success('Análise criada com sucesso', 'Sucesso');
        this.analise.id = id;
        this.carregarAnalise(id);
      }, () => {
        this.toastr.error('Não foi possível salvar a análise. Tente novamente mais tarde', 'Ops');
      });
    }
  }

}
