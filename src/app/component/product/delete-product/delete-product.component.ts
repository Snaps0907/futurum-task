import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit{
  productId !: string;
  productName !: string;
  title !: string;
  allCampaigns: void[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dataApi: DataService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DeleteProductComponent>
  ) {
    this.productName = data.productName;
    this.title = data.title;
    this.productId = data.productId;

  }

  ngOnInit(): void { }

  close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteProduct = true;
    this.dialogRef.close(deleteProduct);
  }
}
