import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author} from "./models/Author";
import {Observable, of} from "rxjs";
import { map } from 'rxjs/operators'
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private preloadAuthors : Author[] | undefined;

  constructor(private http : HttpClient) { }

  public preloadAuthors$(): Observable<Author[]> {
    if (!this.preloadAuthors) {
      return this.http.get<Author[]>(`${environment.apiUrl}/authors`).pipe(
        map(authors => {
          this.preloadAuthors = authors;
          return authors;
        })
      );
    }
    return of(this.preloadAuthors);
  }

  public getAuthor(id: Number): Observable<Author> {
    const defaultAuthor : Author = {
      name: 'Inconnu',
      firstname : 'Inconnu',
      id: 0,
      biography: 'Pas d\'information sur cet auteur',
    }

    return of(this.preloadAuthors?.find(author => author.id === id) || defaultAuthor);
  }

  public getAuthors(): Observable<Author[]> {
    return of(this.preloadAuthors as Author[]);
  }
}
