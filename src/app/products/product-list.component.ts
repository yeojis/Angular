import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    //selector:'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: [
        './product-list.component.css'
    ]
})

export class ProductListComponent implements OnInit, OnDestroy{

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;
    //sub: Subscription | undefined; // 초기 데이터형을 subscription 또는 undefined로 둬서 변수 초기값을 지정 안 하도록 할 수 있음.

    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    constructor(private productService: ProductService){}

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }
    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products; // this.products에 값을 비동기로 가져오기때문에 바깥에 filter... = this.products를 넣으면 값이 안 들어간 상태의 this.products 값을 뿌려주기 때문에 리스트가 안 뜬다.
                this.filteredProducts = this.products; 
            },
            error: err => this.errorMessage = err
        });
        //this.products = this.productService.getProducts();
        //this.filteredProducts = this.products;
        //this.listFilter = '쩌고';
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    
    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: '+message;
    }
}