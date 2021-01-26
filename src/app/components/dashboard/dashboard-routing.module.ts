import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnalisesComponent } from "./consultorias/analises/analises.component";
import { DashboardComponent } from "./dashboard.component";
import { CadastroUsuarioComponent } from "./usuarios/cadastro-usuario/cadastro-usuario.component";

const routes: Routes = [
    { 
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'cadastro-usuario',
                component: CadastroUsuarioComponent
            },
            {
                path: 'analises',
                component: AnalisesComponent
            }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule { }
  