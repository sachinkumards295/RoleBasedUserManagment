import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup
  userData:any
  constructor(private fb:FormBuilder, private service:AuthService, private router: Router) { 
    sessionStorage.clear();

    this.loginform = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
  }

  ngOnInit(): void {
  }

  proceedlogin(){

    if(this.loginform.valid){
        this.service.GetUserbyCode(this.loginform.controls['id'].value).subscribe( res => {
           this.userData = res;
           if(this.userData.password == this.loginform.controls['password'].value){

            if(this.userData.isactive){
              sessionStorage.setItem('username', this.userData.id)
              sessionStorage.setItem('userRole', this.userData.role)
              this.router.navigate(['/']);
            } else {
              alert("Please contact admin inActive user")
            }

           } else {
            alert("Invalid Credential")
           }
        })
    }

  }

}
