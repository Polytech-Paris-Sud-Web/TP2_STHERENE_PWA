import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Article} from './models/article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) {
  }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public deleteArticle(article: Article) {
    console.log("delete articles")
    return this.http.delete(`http://localhost:3000/articles/${article.id}`).subscribe(value => {
      console.log(value);
    });
  }

  public createArticle(article: { }) : Observable<Article>{
    return this.http.post<Article>("http://localhost:3000/articles", article);
  }

  public searchArticles(s: String) {
    return this.http.get<Article[]>(`http://localhost:3000/articles?q=${s}`);
  }

  public getTenFirstArticle(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles?_limit=10");
  }

  public getLastTenArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles?_sort=id&_order=desc&_limit=10");
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
  }

  public getArticleByAuthor(id: number): Observable<Article[]> {
    return this.http.get<Article[]>(`http://localhost:3000/articles?author=${id}`);
  }

}
