import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from './product';
import {NumberPlatesService} from './number-plates.service';
import {MatDialog, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';

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
  selectedProduct: Product = new Product();

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
    this.selectedProduct.name = '';
    this.selectedProduct.plate = '';
  }

  createProduct() {

    this.platesService.addPlate(this.selectedProduct).subscribe(res => {
      this.getAllPlates();
      this.clearProduct();
    });
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
