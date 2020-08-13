import { Component, OnInit, Inject } from '@angular/core';
import { PostListItem } from '../model/postlistitem';
import { NgForm } from '@angular/forms';
import { ListService } from '../services/list.service';

import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  newPost: PostListItem = {} as PostListItem;
  isLoading = false;
  isEditing = false;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {editPost: PostListItem}, private blogService: ListService) { }

  ngOnInit(): void {
    this.isEditing = !!_.get(this.data, 'editPost');
    if (this.isEditing) {
      this.newPost = _.clone(this.data.editPost);
    }
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.handleAfterSubmit(this.isEditing ? this.blogService.updateBlog(this.newPost.id, this.newPost) : this.blogService.createBlog(this.newPost));
    }
  }

  handleAfterSubmit(observable: Observable<PostListItem>) {
    return observable.pipe(finalize(() => this.isLoading = false)).subscribe(res => this.dialogRef.close(this.newPost));
  }

}
