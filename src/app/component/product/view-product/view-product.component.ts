import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/shared/model/campaign';
import { DataService } from 'src/app/shared/service/data.service';
import { AddCampaignComponent } from '../../campaign/add-campaign/add-campaign.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  id !: any;
  productObj !: any;
  allCampaigns: Campaign[] = [];
  displayedColumns: string[] = ['name', 'status', 'amount','town','action'];
  dataSource!: MatTableDataSource<Campaign>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService,
    private dialog : MatDialog,
    private _snackBar : MatSnackBar
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProductById();
    this.getAllCampaignsForProduct();
  }

  getProductById() {
    this.dataApi.getProductById(this.id).subscribe(res => {
      this.productObj = res;
    })
  }
  getAllCampaignsForProduct() {
    this.dataApi.getAllCampaigns().subscribe(res => {
      this.allCampaigns = res.map((e : any) => {
        const data = e.payload.doc.data();
        if(data.product_id == this.id) {
          data.campaign_id = e.payload.doc.id;
          return data;
        }
      })

      this.allCampaigns = this.allCampaigns.filter(item => item != undefined);
      this.dataSource = new MatTableDataSource(this.allCampaigns);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewCampaign(row : any) {
    window.open('/campaign/'+row.campaign_id,'_blank');
  }

  editCampaign(row : any) {
    if(row.campaign_id == null || row.campaign_name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit campaign";
    dialogConfig.data.buttonName = "Update";

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddCampaignComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateCampaign(data);
        this.openSnackBar("Campaign is updated successfully.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
