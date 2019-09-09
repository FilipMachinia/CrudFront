import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CarOwner} from '../../models/carOwner';
import {NumberPlatesService} from '../number-plates.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  oldData;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CarOwner,
              private platesService: NumberPlatesService) { }

  ngOnInit() {
    this.oldData = null;
    this.oldData = Object.assign({}, this.data); // copy object without a reference
  }

  cancelEdit() {
    this.dialogRef.close();
  }

  editCarOwner() {
    this.platesService.editPlate(this.oldData, this.data).subscribe(res => {
      this.dialogRef.close();
    });
  }
}
