import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';
import { ConsultoriasService } from 'src/app/services/consultorias.service';
import { EdicaoAnaliseInput } from 'src/app/types/inputs/consultorias/edicao-analise.input';
import { AnexoOutput, DetalhamentoAnaliseOutput } from 'src/app/types/outputs/consultorias/detalhamento-analise.output';

@Component({
  selector: 'app-edicao-analise',
  templateUrl: './edicao-analise.component.html',
  styleUrls: ['./edicao-analise.component.scss']
})
export class EdicaoAnaliseComponent implements OnInit {

  public status: string;
  public analise: EdicaoAnaliseInput;
  public analiseDetalhada: DetalhamentoAnaliseOutput;
  private novosAnexos: File[] = [];

  constructor(private consultoriasService: ConsultoriasService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.analise = new EdicaoAnaliseInput();
    this.analiseDetalhada = new DetalhamentoAnaliseOutput();
    this.analiseDetalhada.anexos = [];
    const id = this.route.snapshot.paramMap.get("idAnalise");
    if(id) {
      this.carregarAnalise(parseInt(id));
    } else {
      this.status = "nova";
    }
  }

  carregarAnalise(id: number) {
    this.consultoriasService.obterDetalheAnalise(id).subscribe(detalheAnalise => {
      this.analiseDetalhada = detalheAnalise;
      this.analise.id = detalheAnalise.id;
      this.analise.titulo = detalheAnalise.titulo;
      this.analise.resumo = detalheAnalise.resumo;
      this.analise.dataPublicacao = detalheAnalise.dataPublicacao;
      if(detalheAnalise.dataPublicacao) {
        this.status = "publicada";
      } else {
        this.status = "rascunho";
      }
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

        if(this.novosAnexos.length > 0) {
          this.salvarAnexos();
        } else {
          this.carregarAnalise(this.analise.id);
        }
      }, () => {
        this.toastr.error('Não foi possível salvar a análise. Tente novamente mais tarde', 'Ops');
      });
    } else {
      this.consultoriasService.inserirAnalise(this.analise).subscribe(id => {
        this.toastr.success('Análise criada com sucesso', 'Sucesso');
        this.analise.id = id;

        if(this.novosAnexos.length > 0) {
          this.salvarAnexos();
        } else {
          this.carregarAnalise(id);
        }
      }, () => {
        this.toastr.error('Não foi possível salvar a análise. Tente novamente mais tarde', 'Ops');
      });
    }
  }

  salvarAnexos() {
    this.toastr.info('Enviando anexos...', 'Aviso');

    const obs: Observable<any>[] = [];

    for(let anexo of this.novosAnexos) {
      obs.push(this.consultoriasService.inserirAnexo(this.analise.id, anexo));
    }

    forkJoin(obs).subscribe(() => {
       this.toastr.success('Anexos enviados com sucesso!', 'Sucesso');
       this.carregarAnalise(this.analise.id);
    }, (err) => {
      this.toastr.error('Erro ao salvar anexos', 'Ops');
      this.carregarAnalise(this.analise.id);
    });
  }

  excluirAnexo(anexo: AnexoOutput) {
    if(!anexo.id) {
      this.novosAnexos = this.novosAnexos.filter(file => file.name == anexo.nomeArquivo);
      this.analiseDetalhada.anexos = this.analiseDetalhada.anexos.filter(a => a != anexo);
    } else {
      if(confirm('Deseja excluir esse anexo permanentemente?')){
        this.consultoriasService.excluirAnexo(this.analise.id, anexo.id).subscribe(() => {
          this.toastr.success('Anexo excluído com sucesso', 'Sucesso');
          this.analiseDetalhada.anexos = this.analiseDetalhada.anexos.filter(a => a != anexo);
        }, () => {
          this.toastr.error('Não foi possível excluir o anexo. Tente novamente mais tarde.', 'Ops');
        });
      }
    }
  }

  download(anexo: AnexoOutput) {
    this.consultoriasService.download(this.analise.id, anexo.id).subscribe(resposta => {
       window.open(resposta.url);
    }, () => {
      this.toastr.error('Não foi possível baixar o anexo. Tente novamente mais tarde.', 'Ops');
    });
  }

  handleAnexo(files: FileList) {
       const file = files.item(0);
       const anexo = new AnexoOutput();
       anexo.nomeArquivo = file.name;
       this.novosAnexos.push(file);
       this.analiseDetalhada.anexos.push(anexo);
       (<HTMLInputElement>document.getElementById("inputAnexo")).value = "";
  }
}
