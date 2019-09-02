import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from './product';
import {NumberPlatesService} from './number-plates.service';
import {MatDialog, MatSort, MatTable, MatTableDataSource} from '@angular/material';
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
  dataSource = new MatTableDataSource<Product[]>();
  displayedColumns: string[] = ['name', 'plate', 'edit', 'delete'];
  loading = false;
  // selectedProduct: Product = new Product();
  nameValidator = '^[A-Za-z]+$';
  // 2 letters 2 numbers and 3 letters, read more on https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_the_United_Kingdom
  britishCarPlateValidator = '^[A-Za-z]{2}[0-9]{2}[A-Za-z]{3}$';
  selectedProduct = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.nameValidator)]),
    plate: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.britishCarPlateValidator)])
  });
  constructor(private platesService: NumberPlatesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getAllPlates();
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
    this.selectedProduct.reset();
  }

  createProduct(selectedProduct) {
    if (selectedProduct.valid) {
      this.platesService.addPlate({name: this.selectedProduct.value.name, plate: this.selectedProduct.value.plate}).subscribe(res => {
        this.getAllPlates();
        this.clearProduct();
      });
    }
  }

  getAllPlates() {
    this.loading = true;
    this.platesService.getPlates().subscribe(res => {
      this.dataSource = res;
      this.table.renderRows();
      this.loading = false;
    });
  }
}
