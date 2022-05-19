import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author} from "./models/Author";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http : HttpClient) { }

  public getAuthors() : Observable<Author[]>{
    return this.http.get<Author[]>("http://localhost:3000/authors");
  }

  public getAuthor(id : number) : Observable<Author>{
    return this.http.get<Author>(`http://localhost:3000/authors/${id}`);
  }

}
