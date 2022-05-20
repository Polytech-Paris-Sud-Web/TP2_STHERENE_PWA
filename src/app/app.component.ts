import { AuthorService } from './author.service';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static title = 'hello';

  constructor(private articleService: ArticleService, private authorService : AuthorService) { }

  ngOnInit() {
    this.authorService.preloadAuthors$().subscribe();
    this.articleService.preloadArticles$().subscribe();
  }
}
