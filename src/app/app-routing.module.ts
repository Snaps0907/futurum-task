import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './component/product/add-product/add-product.component';
import { ProductComponent } from './component/product/product.component';

const routes: Routes = [{ path: '', redirectTo: 'product', pathMatch: 'full' },
{ path: 'product', component: ProductComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
