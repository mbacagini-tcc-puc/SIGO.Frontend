import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CadastroUsuarioComponent } from './usuarios/cadastro-usuario/cadastro-usuario.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    CadastroUsuarioComponent
  ],
  providers: [
    UsuariosService
  ]
})
export class DashboardModule { }
