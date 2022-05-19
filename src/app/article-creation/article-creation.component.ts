import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from "../article.service";
import {AuthorService} from "../author.service";
import {Author} from "../models/Author";
import {Router} from "@angular/router";


@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  articleForm : FormGroup;
  authorList : Author[] = [
    {
      name: "Bonjour",
      id: 0,
      firstname: "",
      biography: ""
    }
  ];

  constructor(private fb: FormBuilder, private articleService: ArticleService, private authorService: AuthorService, private route: Router) {
    authorService.getAuthors().subscribe((value) => {
      console.log(value);
      this.authorList = value;
    });
    this.articleForm = this.fb.group({
      title: ['', Validators.required ],
      content : ['', Validators.required ],
      author : [1, Validators.required ],
      color : ['#000000']
    });
  }

  createArticle() {
    const { title, content, author, color } = this.articleForm.value;
    const newArticle = {
      title,
      content,
      author,
      color
    }
    console.log(newArticle);
    this.articleService.createArticle(newArticle).subscribe((value) => {
      this.route.navigate(['/article', value.id]);
    });
    //this.articleForm.reset();
  }

  ngOnInit(): void {
  }

}
