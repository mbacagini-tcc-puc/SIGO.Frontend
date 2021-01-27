import { Component, OnInit } from '@angular/core';
import { ConsultoriasService } from 'src/app/services/consultorias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ConsultaAnaliseOutput } from 'src/app/types/outputs/consultorias/consulta-analise.output';

@Component({
  selector: 'app-analises',
  templateUrl: './analises.component.html',
  styleUrls: ['./analises.component.scss']
})
export class AnalisesComponent implements OnInit {

  constructor(private consultoriasService: ConsultoriasService, public usuarioService: UsuariosService) { }

  public analises: ConsultaAnaliseOutput[] = [];
  public currentPage: number = 1;

  ngOnInit() {
    this.carregarAnalises();
  }

  carregarAnalises() {
    this.consultoriasService.consultarAnalises().subscribe(analises => {
      this.analises = analises;
    });
  }

}
