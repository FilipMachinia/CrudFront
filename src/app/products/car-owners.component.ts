import {Component, OnInit, ViewChild} from '@angular/core';
import {CarOwner} from '../models/carOwner';
import {NumberPlatesService} from './number-plates.service';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {
  @ViewChild('plateTable', { static: true }) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource<CarOwner[]>();
  displayedColumns: string[] = ['name', 'plate', 'edit', 'delete'];
  loading = false;
  nameValidator = '^[A-Za-z]+$';
  // 2 letters 2 numbers and 3 letters, read more on https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_the_United_Kingdom
  britishCarPlateValidator = '^[A-Za-z]{2}[0-9]{2}[A-Za-z]{3}$';
  carOwnerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.nameValidator)]),
    plate: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.britishCarPlateValidator)])
  });
  constructor(private platesService: NumberPlatesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllPlates();
    this.dataSource.paginator = this.paginator;
  }

  editCarOwner(carOwner: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: carOwner
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllPlates();
    });
  }

  deleteCarOwner(carOwner: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: carOwner
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllPlates();
    });
  }

  clearCarOwner() {
    this.carOwnerForm.reset();
    /* https://github.com/angular/components/issues/4190 */
    Object.keys(this.carOwnerForm.controls).forEach(key => {
      this.carOwnerForm.controls[key].setErrors(null);
    });
  }

  createCarOwner(carOwnerFrm) {
    if (carOwnerFrm.valid && carOwnerFrm.value.name && carOwnerFrm.value.plate) {
      this.platesService.addPlate({name: this.carOwnerForm.value.name, plate: this.carOwnerForm.value.plate}).subscribe(res => {
        this.getAllPlates();
        this.clearCarOwner();
      });
    }
  }

  getAllPlates() {
    this.loading = true;
    this.platesService.getPlates().subscribe(res => {
      this.dataSource.data = this.sortCarOwners(res);
      this.table.renderRows();
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortCarOwners(array) {
    array.sort( (a: CarOwner, b: CarOwner) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
