import { Component, OnInit } from '@angular/core';

import {ArticleService} from '../article.service';
import {Article} from '../models/article';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles!: Article[];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.getArticles().subscribe((value => {
      this.articles = value;
    }));
  }

  delete(article: Article) {
    this.articleService.deleteArticle(article);
    this.ngOnInit();
  }

  searchArticles(e: Event) {
    const searchText = (<HTMLInputElement>e.target).value;
    this.articleService.searchArticles(searchText).subscribe((value => {
      this.articles = value;
    }));
  }

}
