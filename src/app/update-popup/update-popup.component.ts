import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  registerform:FormGroup
  editdata:any
  roleList: any;
  constructor(private builder: FormBuilder, private service: AuthService, public dialogRef: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    this.registerform =  this.builder.group( {
      id: this.builder.control(''),
      name: this.builder.control(''),
      password: this.builder.control(''),
      email: this.builder.control(''),
      gender: this.builder.control('male'),
      role: this.builder.control('', Validators.required),
      isactive: this.builder.control(false)
    })


  }
 
  ngOnInit(): void {
    this.service.getAllRole().subscribe( res => {
this.roleList = res;
console.log("this is the role" + this.roleList)
    })

    if(this.data.userList != null, this.data.userList != ''){
      this.service.GetUserbyCode( this.data.userList).subscribe( res => {
           this.editdata  = res;
           this.registerform.setValue({
            id: this.editdata.id, name: this.editdata.name,
            password: this.editdata.password, email: this.editdata.email, gender: this.editdata.gender,
            role: this.editdata.role, isactive: this.editdata.isactive
          });
      })
    }
  }

  updateUser(){
    this.service.updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
      alert("data updated sucessfully")
      this.dialogRef.close();
    });
  }

  close(){
    this.dialogRef.close();
  }


  

}
