import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../models/article";
import {Author} from "../models/Author";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../article.service";
import {AuthorService} from "../author.service";

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  @Input()
  author: Author = {
    name: "",
    id: 0,
    firstname: "",
    biography: ""
  };

  articles : Article[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private authorService: AuthorService) {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.authorService.getAuthor(id).subscribe(value => {
      this.author = value;
      this.articleService.getArticleByAuthor(id).subscribe(value => {
        this.articles = value;
      });
    });
  }

  ngOnInit(): void {
  }

  delete(article: Article) {
    this.articleService.deleteArticle(article);
  }

  public gotoArticle(article: Article) {
    this.router.navigate(['/article', article.id]);
  }
}
