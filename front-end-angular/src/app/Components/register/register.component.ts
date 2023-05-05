import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errormsg:any = [];
  constructor(private router: Router, private service:ApiService) { }

  
  userForm=new FormGroup({
    'username':new FormControl('',[Validators.required, Validators.email]),
    'firstName':new FormControl('',[Validators.required,Validators.maxLength(60)]),
    'lastName':new FormControl('',[Validators.required,Validators.maxLength(60)]),
    'password':new FormControl('',[Validators.required, Validators.minLength(5)]),
    'confirmPassword':new FormControl('',[Validators.required, Validators.minLength(5)]),
    
  },
 
  );
 

  ngOnInit(): void {
  }
  
  registerUser(){
    if(this.userForm.valid) {
      if(this.userForm.get('password')?.value === this.userForm.get('confirmPassword')?.value) {
        this.service.createUser(this.userForm.value).subscribe((res)=>{
          // console.log("data inserted",res);
          this.router.navigate(['login']);
        })
        // this.router.navigate(['home']);
      
      } 
      else {
        this.errormsg.push("Passwords do not match!!") ;
        
      }
      
      // console.log(this.userForm.value);
      // console.log("Register clicked");
      
    }
     else {
      //  console.log("Just checking");
      this.errormsg.push("All fields are required! ");
    }
      
   
  }
  getErrorMessage() {
    if (this.userForm.get("username")?.value.hasError('required')) {
      return 'You must enter a value';
    }

    return this.userForm.get("username")?.value.hasError('email') ? 'Not a valid email' : '';
  }

  public hasError = (controlName: string, errorName: string) =>{

    return this.userForm.controls[controlName].hasError(errorName);

  }
}

