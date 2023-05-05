import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private service: ApiService, private router: Router) { }
  data: any;
  days: any;
  productCode:any;
  flagPin = false;
  delivery = false;

  pincodeForm = new FormGroup({
    'pincode': new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if(sessionStorage.getItem('user')=='false'){
      this.router.navigate(['/login']);
    }else{
    this.activatedRoute.params.subscribe(s=> {
      this.productCode=s;
      this.service.productDetails(s).subscribe((res)=>{
        console.log(res);
        this.data = res;
      }) 
      console.log(s)
    });
  }
}

  checkDeliverable() {
    
    console.log("check del");
    this.service.getDeliverable(this.pincodeForm.value,this.productCode).subscribe((res)=> {
      console.log(res, "<---- res");
      if(res!=null) {
        console.log("Days to deliver", res);
        this.days = res;
        this.flagPin = true;
        this.delivery = true;
      }
      else {
        this.flagPin = true;
        this.delivery = false;
        console.log("Not Deliverable");
      }
    })
  }

}
