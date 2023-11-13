import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/model/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  productsArr: any[] = [];
  displayedColumns: string[] = ['name', 'description','action'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private _snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register product',
      buttonName: 'Register'
    }
    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.addProduct(data);
        this.openSnackBar("Registration of product is successful.", "OK");
      }
    })
  }

  editProduct(row:any){
    if(row.id == null || row.name == null){
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit product";
    dialogConfig.data.buttonName = "Update";

    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateProduct(data);
        this.openSnackBar("Product is updated successfully.", "OK")
      }
    })
  }
  
  deleteProduct(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete product',
      productName : row.name,
      productId : row.id
    }

    const dialogRef = this.dialog.open(DeleteProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deleteProduct(row.id);
        this.openSnackBar("Product deleted successfully.", "OK")
      }
    })
  }

  getAllProducts() {
    this.dataApi.getAllProducts().subscribe(res => {
      this.productsArr = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.productsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
