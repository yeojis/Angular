import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // id 값을 number로 갖고 있어야하기 때문에 형변환
    this.pageTitle += `: ${id}`;
    this.product = {
      "productId" : 1,
      "productName" : "어쩌고",
      "productCode" : "test-01",
      "releaseDate" : "March 18, 2021",
      "description" : "웅앵웅",
      "price" : 1000,
      "starRating" : 4.1,
      "imageUrl" : "assets/images/test-01.jpg"
  }
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }
}
