import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DeleteDialogContentComponent} from '../delete-dialog-content/delete-dialog-content.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  @Input()
  employeeID: number;
  @Output()
  confirmDelete = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogContentComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDelete.emit(this.employeeID);
      }
    });
  }

}
