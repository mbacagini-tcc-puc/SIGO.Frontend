import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConsultaAnaliseOutput } from "../types/outputs/consultorias/consulta-analise.output";

@Injectable()
export class ConsultoriasService extends HttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public consultarAnalises(): Observable<ConsultaAnaliseOutput[]> {
        return this.httpClient.get<ConsultaAnaliseOutput[]>(this.endpoint + "/consultorias/analises", this.getRequestOptions());
    }
}