import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {Article} from './models/Article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private preloadArticles: Article[] | undefined;

  constructor(private http: HttpClient) {
  }

  public preloadArticles$(): Observable<Article[]> {
    if (!this.preloadArticles) {
      return this.http.get<Article[]>(`${environment.apiUrl}/articles`).pipe(
        map(articles => {
          this.preloadArticles = articles;
          return articles;
        })
      );
    }

    return of(this.preloadArticles);
  }


  public getArticles(): Observable<Article[]> {
    return this.preloadArticles ? of(this.preloadArticles) : this.http.get<Article[]>(`${environment.apiUrl}/articles`);
  }

  public getLastTenArticles(): Observable<Article[]> {
    return this.getArticles().pipe(
      map(articles => articles.slice(0, 10))
    );
  }


  public getArticle(id: number): Observable<Article> {
    return this.getArticles().pipe(
      map(articles => articles.find(article => article.id === id) as Article)
    );
  }

  public deleteArticle(article: Article): Observable<Article> {
    return this.http.delete<Article>(`${environment.apiUrl}/articles/${article.id}`);
  }

  public createArticle(article: {}): Observable<Article> {
    return this.http.post<Article>(`${environment.apiUrl}/articles`, article);
  }


  public searchArticles(s: String) {
    return this.getArticles().pipe(
      map(articles => articles.filter(article => {
        return article.title.toLowerCase().includes(s.toLowerCase()) || article.content.toLowerCase().includes(s.toLowerCase());
      }))
    );
  }

  public getArticleByAuthor(id: number): Observable<Article[]> {
    return this.getArticles().pipe(map(articles => articles.filter(article => article.author === id)));
  }

}
