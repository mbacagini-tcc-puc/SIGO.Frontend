import { Injectable, NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UsuariosService } from "src/app/services/usuarios.service";


class CanActivateModulo implements CanActivate {
  constructor(private usuariosService: UsuariosService, private modulo: string) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.usuariosService.validarPermissao(this.modulo);
  }
}

@Injectable()
export class CanActivateModuloUsuarios extends CanActivateModulo {
    constructor(usuariosService: UsuariosService) { super(usuariosService, "usuarios") }
}

@Injectable()
export class CanActivateModuloConsultorias extends CanActivateModulo {
    constructor(usuariosService: UsuariosService) { super(usuariosService, "assessorias-consultorias") }
}

@NgModule({
    imports: [],
    providers: [
        CanActivateModuloUsuarios,
        CanActivateModuloConsultorias
    ]
  })
  export class RouteGuardsModule { }
  