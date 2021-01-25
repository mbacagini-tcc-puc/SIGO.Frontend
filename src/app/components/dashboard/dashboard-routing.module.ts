import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
            }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule { }
  