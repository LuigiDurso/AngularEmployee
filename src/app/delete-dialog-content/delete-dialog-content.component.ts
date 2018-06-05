import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog-content',
  templateUrl: './delete-dialog-content.component.html',
  styleUrls: ['./delete-dialog-content.component.css']
})
export class DeleteDialogContentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }

}
