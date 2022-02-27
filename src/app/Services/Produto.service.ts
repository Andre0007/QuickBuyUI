import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../Models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${environment.UrlAPI}/api/produto`, JSON.stringify(produto), { headers: this.headers });
  }

  public alterar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${environment.UrlAPI}/api/produto`, JSON.stringify(produto), { headers: this.headers });
  }

  public deletar(produto: Produto): Observable<Produto[]> {
    return this.http.delete<Produto[]>(`${environment.UrlAPI}/api/produto/${produto.id}`, { headers: this.headers });
  }

  public obterTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${environment.UrlAPI}/api/produto`);
  }

  public obterProduto(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(`${environment.UrlAPI}/api/produto/obter/${produtoId}`);
  }

  public enviarArquivo(arquivoSelecionado: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
    return this.http.post<string>(`${environment.UrlAPI}/api/produto/enviarArquivo`, formData);
  }

}