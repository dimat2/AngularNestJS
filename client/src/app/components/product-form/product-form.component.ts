import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  product: Product = {
    title: "",
    description: "",
    price: 0
  };

  edit: boolean = false;

  submitProduct() {
    this.productService.createProduct(this.product).subscribe(res => {
      console.log(res),
      this.router.navigate(["/"])
    }, err => console.log(err));
  }

  updatedProduct() {
    this.productService.updateProduct(this.product.id, this.product).subscribe(res => {
      console.log(res),
      this.router.navigate(["/products"])
    }, err => console.log(err));
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.productService.getProduct(params.id).subscribe(res => {
        console.log(res),
        this.product = res,
        this.edit = true
      });
    }
  }
}
