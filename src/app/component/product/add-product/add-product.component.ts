import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  buttonName !: string;
  id !: string;
  name !: string;
  description !: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {
    this.title = data.title;
    this.buttonName = data.buttonName;
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      name: [this.name, [Validators.required]],
      description: [this.description, Validators.required]
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerProduct() {
    this.dialogRef.close(this.form.value);
  }
}
