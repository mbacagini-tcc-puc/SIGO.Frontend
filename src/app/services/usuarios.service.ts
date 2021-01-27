import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AutenticacaoInput } from "../types/inputs/usuarios/autenticacao.input";
import { Observable } from "rxjs";
import { AutenticacaoOutput } from "../types/outputs/usuarios/autenticacao.output";
import { ConfirmacaoAutenticacaoInput } from "../types/inputs/usuarios/confirmacao-autenticacao.input";
import { ConfirmacaoAutenticacaoOutput } from "../types/outputs/usuarios/confirmacao-autenticacao.output";
import { ModuloOutput } from "../types/outputs/usuarios/modulo.output";
import { CriacaoUsuarioInput } from "../types/inputs/usuarios/criacao-usuario.input";

@Injectable()
export class UsuariosService extends HttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public autenticar(input: AutenticacaoInput) : Observable<AutenticacaoOutput> {
        return this.httpClient.post<AutenticacaoOutput>(this.endpoint + "/usuarios/auth", input);
    }

    public confirmarCodigo(input: ConfirmacaoAutenticacaoInput) : Observable<ConfirmacaoAutenticacaoOutput> {
        return this.httpClient.post<ConfirmacaoAutenticacaoOutput>(this.endpoint + "/usuarios/auth/verificacao", input);
    }

    public obterModulos(): Observable<ModuloOutput[]> {
        return this.httpClient.get<ModuloOutput[]>(this.endpoint + "/usuarios/modulos", this.getRequestOptions());
    }

    public criarUsuario(input: CriacaoUsuarioInput): Observable<any> {
        return this.httpClient.post(this.endpoint + "/usuarios/usuarios", input, this.getRequestOptions());
    }

    public validarPermissao(modulo: string): Observable<boolean> {
        return new Observable<boolean>(obs => {
            this.httpClient.get(this.endpoint + `/usuarios/auth/permissoes?modulo=${modulo}`, this.getRequestOptions())
                    .subscribe(() => {
                        obs.next(true);
                    }, () => {
                        obs.next(false);
                    });
        });
    }
}