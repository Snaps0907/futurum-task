import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { ViewProductComponent } from './component/product/view-product/view-product.component';
import { CampaignComponent } from './component/campaign/campaign.component';

const routes: Routes = [{ path: '', redirectTo: 'product', pathMatch: 'full' },
{ path: 'product', component: ProductComponent },
{ path: 'product/:id', component: ViewProductComponent },
{ path: 'campaign', component: CampaignComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
