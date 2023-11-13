import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../model/product';

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
}
