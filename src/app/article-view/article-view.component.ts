import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../models/Article';
import {Author} from "../models/Author";
import {AuthorService} from "../author.service";

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  @Input()
  article : Article | undefined;

  author: Author | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private authorService: AuthorService) {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.articleService.getArticle(id).subscribe(value => {
      this.article = value;
      this.authorService.getAuthor(this.article.author).subscribe(value => {
        this.author = value;
      });
    });
  }

  ngOnInit(): void {
  }

  delete(article: Article) {
    this.articleService.deleteArticle(article);
  }

  public gotoAuthor(author: Author) {
    this.router.navigate(['/author', author.id]);
  }
}
