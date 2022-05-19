import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../article.service";
import {Article} from "../models/article";
import {AuthorService} from "../author.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topArticles!: Article[]

  constructor(private articleService : ArticleService, public authorService: AuthorService, private route : Router) { }

  ngOnInit(): void {
    this.articleService.getLastTenArticles().subscribe((value => {
      this.topArticles = value;
    }));
  }

  public gotoArticle(article: Article) {
    this.route.navigate(['/article', article.id]);
  }
}
