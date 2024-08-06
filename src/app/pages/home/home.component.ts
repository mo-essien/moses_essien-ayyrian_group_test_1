import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// services
import { PostsService } from '../../services/posts.service';

// models/ interfaces/ types
import { Post } from '../../interface/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PostsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  title: string = "Posts from JSONplaceholder API"
  posts: Post[] = []

  sortedBy: string = '';
  sortingDirection: string = 'asc';

  sortTable(column: keyof Post): void {
    console.log('sorting table by ', column);
    
    if (this.sortedBy === column) {
      this.sortingDirection = this.sortingDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedBy = column;
      this.sortingDirection = 'asc';
    }

    this.posts.sort((a, b) => {
      if (a[column] <= b[column]) {
        return this.sortingDirection === 'asc' ? -1 : 1;
      }
      if (a[column] >= b[column]) {
        return this.sortingDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((response: Post[]) => {
      if (response) {
        this.posts = response
      }
    }), (err: any) => {
      console.log(`error`, err);
    }
  }
}
