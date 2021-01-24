import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AutenticacaoInput } from "../types/inputs/usuarios/autenticacao.input";
import { Observable } from "rxjs";
import { AutenticacaoOutput } from "../types/outputs/usuarios/autenticacao.output";
import { ConfirmacaoAutenticacaoInput } from "../types/inputs/usuarios/confirmacao-autenticacao.input";
import { ConfirmacaoAutenticacaoOutput } from "../types/outputs/usuarios/confirmacao-autenticacao.output";

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
}