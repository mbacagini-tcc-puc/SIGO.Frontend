import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConsultaAnaliseOutput } from "../types/outputs/consultorias/consulta-analise.output";
import { EdicaoAnaliseInput } from "../types/inputs/consultorias/edicao-analise.input";

@Injectable()
export class ConsultoriasService extends HttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public consultarAnalises(): Observable<ConsultaAnaliseOutput[]> {
        return this.httpClient.get<ConsultaAnaliseOutput[]>(this.endpoint + "/consultorias/analises", this.getRequestOptions());
    }

    public inserirAnalise(input: EdicaoAnaliseInput) : Observable<number> {
        return this.httpClient.post<number>(this.endpoint + "/consultorias/analises", input, this.getRequestOptions());
    }

    public atualizarAnalise(input: EdicaoAnaliseInput) : Observable<any> {
        return this.httpClient.put<any>(this.endpoint + "/consultorias/analises/" + input.id, input, this.getRequestOptions());
    }
}