import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConsultaAnaliseOutput } from "../types/outputs/consultorias/consulta-analise.output";
import { EdicaoAnaliseInput } from "../types/inputs/consultorias/edicao-analise.input";
import { DetalhamentoAnaliseOutput } from "../types/outputs/consultorias/detalhamento-analise.output";

@Injectable()
export class ConsultoriasService extends HttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public consultarAnalises(): Observable<ConsultaAnaliseOutput[]> {
        return this.httpClient.get<ConsultaAnaliseOutput[]>(this.endpoint + "/consultorias/analises", this.getRequestOptions());
    }

    public obterDetalheAnalise(id: number): Observable<DetalhamentoAnaliseOutput> {
        return this.httpClient.get<DetalhamentoAnaliseOutput>(this.endpoint + `/consultorias/analises/${id}`, this.getRequestOptions());
    }

    public inserirAnalise(input: EdicaoAnaliseInput) : Observable<number> {
        return this.httpClient.post<number>(this.endpoint + "/consultorias/analises", input, this.getRequestOptions());
    }

    public atualizarAnalise(input: EdicaoAnaliseInput) : Observable<any> {
        return this.httpClient.put<any>(this.endpoint + `/consultorias/analises/${input.id}`, input, this.getRequestOptions());
    }

    public inserirAnexo(analiseId: number, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('anexo', file, file.name);
        return this.httpClient.post<any>(this.endpoint + `/consultorias/analises/${analiseId}/anexos`, formData, this.getRequestOptions());
    }

    public excluirAnexo(analiseId: number, anexoId: number): Observable<any> {
        return this.httpClient.delete<any>(this.endpoint + `/consultorias/analises/${analiseId}/anexos/${anexoId}`, this.getRequestOptions());
    }

    public download(analiseId: number, anexoId: number): Observable<any> {
        return this.httpClient.get<any>(this.endpoint + `/consultorias/analises/${analiseId}/anexos/${anexoId}/download`, this.getRequestOptions());
    }
}