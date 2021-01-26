import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CadastroUsuarioComponent } from './usuarios/cadastro-usuario/cadastro-usuario.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AnalisesComponent } from './consultorias/analises/analises.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConsultoriasService } from 'src/app/services/consultorias.service';
import { EdicaoAnaliseComponent } from './consultorias/analises/edicao-analise/edicao-analise.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardRoutingModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    CadastroUsuarioComponent,
    AnalisesComponent,
    EdicaoAnaliseComponent
  ],
  providers: [
    UsuariosService,
    ConsultoriasService
  ]
})
export class DashboardModule { }
