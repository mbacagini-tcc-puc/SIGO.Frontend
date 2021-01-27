import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnalisesComponent } from "./consultorias/analises/analises.component";
import { EdicaoAnaliseComponent } from "./consultorias/analises/edicao-analise/edicao-analise.component";
import { DashboardComponent } from "./dashboard.component";
import { CanActivateModuloConsultorias, CanActivateModuloHome, CanActivateModuloUsuarios } from "./route-guards";
import { CadastroUsuarioComponent } from "./usuarios/cadastro-usuario/cadastro-usuario.component";

const routes: Routes = [
    { 
        path: '',
        component: DashboardComponent,
        canActivate: [CanActivateModuloHome],
        children: [
            {
                path: 'cadastro-usuario',
                component: CadastroUsuarioComponent,
                canActivate: [CanActivateModuloUsuarios]
            },
            {
                path: 'analises',
                component: AnalisesComponent,
                canActivate: [CanActivateModuloConsultorias]
            },
            {
                path: 'analises/nova',
                component: EdicaoAnaliseComponent,
                canActivate: [CanActivateModuloConsultorias]
            },
            {
                path: 'analises/:idAnalise',
                component: EdicaoAnaliseComponent,
                canActivate: [CanActivateModuloConsultorias]
            }    
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule { }
  