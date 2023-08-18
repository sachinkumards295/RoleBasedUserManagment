import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform:FormGroup
  submitted:boolean = false;
  constructor(private builder: FormBuilder, private service:AuthService, private router:Router) {

    this.registerform =  this.builder.group( {
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      gender: this.builder.control('male'),
      role: this.builder.control(''),
      isactive: this.builder.control(false)
    })
   }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerform.controls;
  }

  proceedregister(){
  this.submitted = true;
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        alert('Please contact admin for enable access.');
        this.router.navigate(['login'])
      });
    } else {
      alert('Please enter valid data.')
    }

  }

}
