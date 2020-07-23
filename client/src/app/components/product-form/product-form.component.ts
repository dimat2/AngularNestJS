import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private productService: ProductService) { }

  product: Product = {
    name: "",
    description: "",
    price: 0
  };

  submitProduct() {
    this.productService.createProduct(this.product).subscribe(res => console.log(res), err => console.log(err));
  }

  ngOnInit(): void {
  }
}
