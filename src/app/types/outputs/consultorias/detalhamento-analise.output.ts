export class DetalhamentoAnaliseOutput {
    public id: number;
    public empresa: string;
    public titulo: string;
    public resumo: string;
    public dataInclusao: Date;
    public dataAlteracao: Date;
    public dataPublicacao: Date;
    public usuarioInclusao: string;
    public usuarioAlteracao: string;
    public anexos: AnexoOutput[];
}

export class AnexoOutput {
    public id: number;
    public nomeArquivo: string;
    public dataInclusao: Date;
}