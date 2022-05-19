import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Article} from '../models/article';
import {Router} from "@angular/router";
import {Author} from "../models/Author";
import {AuthorService} from "../author.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  @Input()
  article!: Article;
  author: Author = {
    name: "",
    id: 0,
    firstname: "",
    biography: ""
  };

  @Output()
  deletedArticle : EventEmitter<Article> = new EventEmitter();


  constructor(private route: Router, private authorService: AuthorService) {
  }

  delete(){
    this.deletedArticle.emit(this.article);
  }

  ngOnInit(): void {
    this.authorService.getAuthor(this.article.author).subscribe(value => {
      this.author = value;
    });
  }

  details(){
    this.route.navigate(['/article', this.article.id]);
  }
}
