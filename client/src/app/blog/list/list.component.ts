import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { PostListItem } from '../model/postlistitem';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'subtitle', 'imageURL', 'content', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  isLoading = false;

  postListSubject: BehaviorSubject<PostListItem[]> = new BehaviorSubject(null);

  constructor(private snackBar: MatSnackBar, private postService: ListService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.findAll()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((postListItems) => this.postListSubject.next(postListItems));
  }

  editPost(editPost: PostListItem) {
    const ref = this.matDialog.open(DialogComponent, {
      width: '600px',
      data: {editPost: editPost}

    });

    ref.afterClosed().subscribe((editPost: PostListItem) => {
      if (editPost) {
        const list = this.postListSubject.getValue();
        const blogIndex = _.findIndex(list, blog => blog.id === editPost.id);
        list[blogIndex] = editPost;
        this.postListSubject.next(_.cloneDeep(list));
      }
    });
  }

  deletePost(editPost: PostListItem) {
    const ref = this.matDialog.open(ConfirmComponent);

    ref.afterClosed().subscribe(canContinue => {
      if (canContinue) {
        this.isLoading = true;
        this.postService.deleteBlog(editPost.id).pipe(finalize(() => this.isLoading = false))
          .subscribe(() => {
            const list = this.postListSubject.getValue();
            _.remove(list, blog => blog.id === editPost.id);
            this.postListSubject.next(_.cloneDeep(list));

            this.snackBar.open(`Törölve: ${editPost.title}`, null, {
              duration: 2500
            });
          });
      }
    });
  }

  createPost() {
    const ref = this.matDialog.open(DialogComponent, {
      width: '600px'
    });

    ref.afterClosed().subscribe((newPost: PostListItem) => {
      if (newPost) {
        this.postService.findAll()
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe((postListItems) =>
            this.postListSubject.next(postListItems)
          );
        /* const list = this.postListSubject.getValue();
        list.reverse();
        list.push(newPost);
        list.reverse();
        console.log(list);
        this.postListSubject.next(_.cloneDeep(list)); */

        this.snackBar.open(`Létrehozva: ${newPost.title}`, null, {
          duration: 2500
        });
      }
    });
  }

  position_add_1() {
    this.columnsToDisplay.splice(0, 1);
  }

  position_add_2() {
    this.columnsToDisplay.splice(0, 2);
  }

  position_add_3() {
    this.columnsToDisplay.splice(0, 3);
  }

  position_add_4() {
    this.columnsToDisplay.splice(0, 4);
  }

  position_remove_1() {
    this.columnsToDisplay.splice(0, 1);
  }

  position_remove_2() {
    this.columnsToDisplay.splice(0, 2);
  }

  position_remove_3() {
    this.columnsToDisplay.splice(0, 3);
  }

  position_remove_4() {
    this.columnsToDisplay.splice(0, 4);
  }
}
