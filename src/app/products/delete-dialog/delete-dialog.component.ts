import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NumberPlatesService} from '../number-plates.service';
import {CarOwner} from '../../models/carOwner';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CarOwner,
              private platesService: NumberPlatesService) { }

  ngOnInit() {
  }

  cancelDelete() {
    this.dialogRef.close();
  }

  deleteCarOwner() {
    this.platesService.deletePlate(this.data).subscribe(res => {
      this.dialogRef.close();
    });
}
}
