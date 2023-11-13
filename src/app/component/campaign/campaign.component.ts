import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Campaign } from 'src/app/shared/model/campaign';
import { Product } from 'src/app/shared/model/product';
import { DataService } from 'src/app/shared/service/data.service';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { DeleteCampaignComponent } from './delete-campaign/delete-campaign.component';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent {

  allCampaigns: Campaign[] = [];
  allProducts: Product[] = []
  displayedColumns: string[] = ['name','product', 'action'];
  dataSource!: MatTableDataSource<Campaign>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private _snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.getAllCampaigns();
    this.getAllProducts();
  }

  addCampaign() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register Campaign',
      buttonName: 'Register'
    }

    const dialogRef = this.dialog.open(AddCampaignComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.addCampaign(data);
        this.openSnackBar("Registration of campaign is successful.", "OK")
      }
    })
  }

  getAllCampaigns() {
    this.dataApi.getAllCampaigns().subscribe(res => {
      this.allCampaigns = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.campaign_id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.allCampaigns);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getAllProducts() {
    this.dataApi.getAllProducts().subscribe(res => {
      this.allProducts = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }

  getProductName(id: string) {
    let productName = '';
    this.allProducts.forEach(element => {
      if (element.id == id) {
        productName = element.name;
      }
    });
    return productName;
  }

  deleteCampaign(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete campaign',
      campaignName: row.campaign_name
    }

    const dialogRef = this.dialog.open(DeleteCampaignComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(row);
        this.dataApi.deleteCampaign(row.campaign_id);
        this.openSnackBar("Campaign deleted successfully.", "OK")
      }
    })
  }

  viewCampaign(row: any) {
    window.open('/campaign/' + row.campaign_id, '_blank');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
