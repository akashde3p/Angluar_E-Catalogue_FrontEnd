import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) {
    // console.log(sessionStorage.getItem('user'));
    this.isLoggedIn=sessionStorage.getItem('user');
   }

  isLoggedIn:any;
  username: any;
  user: any;

  isLogout(){
    this.isLoggedIn= sessionStorage.setItem('user','false');
    this.router.navigate(['/']).then(()=> {
      window.location.reload();
    })
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.user = sessionStorage.getItem('user');
    // console.log("this is the user name asfasfsdaf", this.user );
    // console.log(this.username, "this is the username")
  }
  

}
