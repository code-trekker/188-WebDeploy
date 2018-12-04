import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(public router: Router) { }

  show1: boolean;
  show2: boolean;
  show3: boolean;
  show4: boolean;
  username: string = '';
  password: string = '';
  password2: string = '';

  ngOnInit() {
  }

  registerUser() {
    console.log(this.username);    
    console.log(this.password);

    if (this.username === "" ) {
      this.show1 = true;
    } else {
      this.show1 = false;
      if (this.password === "") {
        this.show2 = true;
      } else {
        this.show2 = false;
        if (this.password2 !== this.password) {
          this.show3 = true;
        } else {
          this.show3 = false;

          axios({
            method: 'post',
            url: 'https://wma-188.herokuapp.com/api/register',
            headers: {
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin': '*',
              'crossorigin' : true
            },
            data: {
              username: this.username,
              password: this.password
            }
          })
          .then(response => {
            console.log(response.data.message);
            swal({
              position: 'center',
              type: 'success',
              title: 'Account registered successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            swal.showLoading();
            this.router.navigate(['/login'])
          })
          .catch(error => {
            console.log(error.response);
            console.log(error.response.data.message);
            swal({
              position: 'center',
              type: 'error',
              title: 'Username already exists!',
              showConfirmButton: false,
              timer: 1500
            });
          })

        }
      }
    }
  }

}
