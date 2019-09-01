import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NumberPlatesService} from '../number-plates.service';
import {Product} from '../product';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              private platesService: NumberPlatesService) { }

  ngOnInit() {
  }

  cancelDelete() {
    this.dialogRef.close();
  }

  deleteProduct() {
    this.platesService.deletePlate(this.data).subscribe(res => {
      this.dialogRef.close();
    });
}
}
