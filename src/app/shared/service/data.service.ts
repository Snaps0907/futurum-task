import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../model/product';
import { Campaign } from '../model/campaign';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db : AngularFirestore) { }

  addProduct(product : Product){
    product.id = this.db.createId();
    return this.db.collection("Product/").add(product);
  }

  getAllProducts(){
    return this.db.collection("Product/").snapshotChanges();
  }

  updateProduct(product : Product){
    return this.db.doc(`Product/${product.id}`).update(product);
  }

  deleteProduct(id : string){
    return this.db.doc(`Product/${id}`).delete();
  }

  getProductById(id : string){
    return this.db.doc(`Product/${id}`).valueChanges();
  }

  addCampaign(campaign: Campaign){
    campaign.campaign_id = this.db.createId();
    return this.db.collection("Campaign/").add(campaign);
  }

  getAllCampaigns() {
    return this.db.collection("Campaign/").snapshotChanges();
  }

  updateCampaign(campaign : Campaign) {
    return this.db.doc(`Campaign/${campaign.campaign_id}`).update(campaign);
  }

  deleteCampaign(id : string) {
    return this.db.doc(`Campaign/${id}`).delete();
  }

  getCampaignById(id : any) {
    return this.db.doc(`Campaign/${id}`).valueChanges();
  }

  getFund(){
    return this.db.collection("Fund/").snapshotChanges();
  }
  updateFund(fund:object,fund_id:string){
    return this.db.doc(`Fund/${fund_id}`).update(fund);
  }
}
