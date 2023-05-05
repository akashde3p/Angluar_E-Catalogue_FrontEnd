import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { FADEINOUT } from './fade-in-fade-out.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // selector: 'select-value-binding-brand',
  animations: [FADEINOUT],
})
export class HomeComponent implements OnInit {

  selected = "option";
  constructor(private service: ApiService) { }
  public productList: any;
  public list: any;
  public filterCategory: any
  public uniqueBrands: any = []
  public isLoggedIn: any;
  public found: any;

  logAnimation(_event: any) {
    // console.log(_event);
  }
  searchForm = new FormGroup({
    filter: new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem('user');
    this.service.getProducts().subscribe((res) => {
      // console.log(res);
      this.productList = res;
      // console.log(this.productList.length);
      this.list = res;
      if (this.productList.length == 0) {
        this.found = false;
      } else {
        this.found = true;
      }
      // let sortedCountries = this.list.sort((first, second) => 0 - (first.id > second.id ? -1 : 1));
      // console.log(sortedCountries);

    })

    setTimeout(() => {
      this.productList.forEach((product: any) => {
        if (!this.uniqueBrands.includes(product.brand)) {
          this.uniqueBrands.push(product.brand);
        }

        // console.log(this.uniqueBrands);
      });


    }, 500);
  }


  searchProduct() {

    this.service.getProductsByFilter(this.searchForm.value).subscribe((res => {
      this.productList = res;
      if (this.productList.length == 0) {
        this.found = false;
      } else {
        this.found = true;
      }
    }))


  }

  handleRadio(data: any) {
    // console.log(data.value);
    if (data.value == '-2000') {
      this.productList = this.list;
      this.productList = this.productList.filter((prod: any) => prod.price < 2000)
    }
    if (data.value == '2000-5000') {
      this.productList = this.list;
      this.productList = this.productList.filter((prod: any) => prod.price > 2000 && prod.price <= 5000)
    }
    if (data.value == '5000+') {
      this.productList = this.list;
      this.productList = this.productList.filter((prod: any) => prod.price > 5000)
      // console.log(this.productList)
    }
    if (data.value == 'showall') {
      this.productList = this.list;
    }
  }

  handleselect(data: any) {
    // console.log(data, "<------ this is the data")
    if (data.value == "all") {
      this.productList = this.list;
    }
    else {
      this.productList = this.list;
      this.productList = this.productList.filter((prod: any) => prod.brand == data.value);
    }

  }



}
