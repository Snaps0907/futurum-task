import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent implements OnInit{
  form !: FormGroup;
  title !: string;
  buttonName !: string;
  campaign_id !: string;
  campaign_name !: string;
  keywords !: string[];
  amount !: number;
  fund !: number;
  status !: boolean;
  town !: string;
  radius !: number;
  product_id !: string;
  product_name !: string;

  allProducts: any[] = [];
  towns: string[] = ['Madison','Pasco','Millville','Collinsville','Bay City','New Paltz','New Harmony','West Orange','Adams','Tullahoma','East Cleveland','Wabash'];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddCampaignComponent>,
    private dataApi: DataService
  ) {
    this.title = data.title;
    this.buttonName = data.buttonName;
    this.campaign_id = data.campaign_id;
    this.campaign_name = data.campaign_name;
    this.keywords = data.keywords;
    this.amount = data.amount;
    this.fund = data.fund;
    this.status = data.status;
    this.town = data.town;
    this.radius = data.radius;
    this.product_id = data.product_id;
    this.product_name = data.product_name;
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.form = this.fb.group({
      campaign_id: [this.campaign_id, []],
      campaign_name: [this.campaign_name, [Validators.required]],
      keywords: [this.keywords, [Validators.required]],
      amount: [this.amount, [Validators.required]],
      fund: [this.fund, [Validators.required]],
      status: [this.status, [Validators.required]],
      town: [this.town, []],
      radius: [this.radius, [Validators.required, Validators.min(0)]],
      product_id: [this.product_id, [Validators.required]],
      product_name: [this.product_name, []]
    })
  }

  getAllProducts() {
    this.dataApi.getAllProducts().subscribe(res => {
      this.allProducts = res.map((e: any) => {
        const data = e.payload.doc.data();
        const product = {
          product_name: data.name,
          product_id: e.payload.doc.id
        }
        return product;
      })
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  async registerCampaign() {
    this.form.value.product_name = await this.getProductName(this.form.value.product_id);
    this.dialogRef.close(this.form.value);
  }

  getProductName(productId: string) {
    for (let i = 0; i < this.allProducts.length; i++) {
      if (this.allProducts[i].product_id == productId) {
        return this.allProducts[i].product_name;
      }
    }
    return "";
  }

}
