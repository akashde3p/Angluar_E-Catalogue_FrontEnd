import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { validateHorizontalPosition } from '@angular/cdk/overlay';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiService,private router:Router) { }

  errormsg:any;
  username: any;
  loginForm=new FormGroup({
    'username': new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required, Validators.minLength(5)])
  })
  ngOnInit(): void {
  }

  checkLogin(){
    if(this.loginForm.valid) {
      // console.log(this.loginForm.value);
      
          this.service.userLogin(this.loginForm.value).subscribe((res)=> {
            if(res){
              sessionStorage.setItem('user',res);
              this.service.getUserDetails(this.loginForm.get('username')?.value).subscribe((res)=>{
                this.username=res.firstName;
                // console.log("this is the username in login page", res);
                sessionStorage.setItem('username',this.username);
                

    
              })
              this.router.navigate([''])
              .then(()=>{
                window.location.reload();
              });
            }else {
              this.errormsg = "Email or Password is incorrect!";
              this.router.navigate(['login']);
            }

             });

   
      

    } else {
      this.errormsg = "All fields are required!"; 
    }
  }

  public hasError = (controlName: string, errorName: string) =>{

    return this.loginForm.controls[controlName].hasError(errorName);

  }
 

}
