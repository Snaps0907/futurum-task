import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import { AddProductComponent } from './component/product/add-product/add-product.component';
import { ViewProductComponent } from './component/product/view-product/view-product.component';
import { DeleteProductComponent } from './component/product/delete-product/delete-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CampaignComponent } from './component/campaign/campaign.component';
import { AddCampaignComponent } from './component/campaign/add-campaign/add-campaign.component';
import { ViewCampaignComponent } from './component/campaign/view-campaign/view-campaign.component';
import { DeleteCampaignComponent } from './component/campaign/delete-campaign/delete-campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AddProductComponent,
    ViewProductComponent,
    DeleteProductComponent,
    SidebarComponent,
    CampaignComponent,
    AddCampaignComponent,
    ViewCampaignComponent,
    DeleteCampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
