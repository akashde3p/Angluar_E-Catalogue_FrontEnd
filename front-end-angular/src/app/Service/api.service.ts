import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url="http://localhost:8081/user";
  login_url="http://localhost:8081/login";
  product_url="http://localhost:8081/allProducts";
  productDetail_url = "http://localhost:8081/productDetails";
  searchProduct_url = "http://localhost:8081/searchProduct";
  deliverableProduct_url = "http://localhost:8081/productDetails";

  constructor(private http:HttpClient) { }

   //view all products
   getProducts():Observable<any>{
    console.warn("products");
    console.log(this.product_url);
    return this.http.get(this.product_url);
  } 

  //create User
  createUser(user:any):Observable<any>{
    console.log("inside createStudent");

    return this.http.post(`${this.url}`,user);  
  }

  //find user
  userLogin(data:any):Observable<any>{
    return this.http.post(`${this.login_url}`,data);
  }

  // product detailed information
  productDetails(data: any) : Observable<any> {
    console.log(data, "datat indise serviec");
    let ids = data;
    console.log(`http://localhost:8081/productDetails/${ids}`);
    return this.http.get(`${this.productDetail_url}/${data.productCode}`);
  }

  // search Product by type
  getProductsByFilter(filter: any) : Observable<any> {
    return this.http.get(`${this.searchProduct_url}/${filter.filter}`);
  }

  // check Deliverable days
  getDeliverable(data: any, productCode: any) : Observable<any> {
    console.log(data, " days");
    return this.http.post(`${this.deliverableProduct_url}/${productCode.productCode}`, data);
  }

  // find the username of user
  getUserDetails( username: any ): Observable<any> {
    console.log(username);
    return this.http.get(`${this.url}/${username}`)
  }
}
