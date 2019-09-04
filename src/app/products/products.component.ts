import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from './product';
import {NumberPlatesService} from './number-plates.service';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('plateTable', { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Product[]>();
  displayedColumns: string[] = ['name', 'plate', 'edit', 'delete'];
  loading = false;
  // carOwnerForm: Product = new Product();
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
    this.dataSource.sort = this.sort;
  }

  editProduct(product: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: product
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllPlates();
    });
  }

  deleteProduct(product: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: product
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllPlates();
    });
  }

  clearProduct() {
    this.carOwnerForm.reset();
    /* https://github.com/angular/components/issues/4190 */
    Object.keys(this.carOwnerForm.controls).forEach(key => {
      this.carOwnerForm.controls[key].setErrors(null);
    });
  }

  createProduct(carOwnerFrm) {
    if (carOwnerFrm.valid) {
      this.platesService.addPlate({name: this.carOwnerForm.value.name, plate: this.carOwnerForm.value.plate}).subscribe(res => {
        this.getAllPlates();
        this.clearProduct();
      });
    }
  }

  getAllPlates() {
    this.loading = true;
    this.platesService.getPlates().subscribe(res => {
      this.dataSource.data = res;
      this.table.renderRows();
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
