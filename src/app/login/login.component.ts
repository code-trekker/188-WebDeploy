import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) { }

  username: string = '';
  password: string = '';
  error_msg: string = '';
  show1: boolean;
  show2: boolean;

  login() {
    var auth_header = 'Basic ' + btoa(this.username + ":" + this.password)

    console.log(auth_header);

    if (this.username === "") {
      this.show1 = true;
    } else {
      this.show1 = false;
      if (this.password === "") {
        this.show2 = true;
      } else {
        this.show2 = false;

        axios({
          method: 'get',
          url: 'https://wma-188.herokuapp.com/api/login',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : auth_header,
            'Access-Control-Allow-Origin': '*',
            'crossorigin' : true
          },
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user_id', response.data.user_id);

          swal({
            position: 'center',
            type: 'success',
            title: 'Logging in...',
            showConfirmButton: false,
            timer: 1500
          });
          swal.showLoading();
          
          setTimeout(() => { this.router.navigate(['/home']); }, 1500);
        })
        .catch(error => {
          swal({
            position: 'center',
            type: 'error',
            title: 'Username/password is incorrect!',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error.response);
        })

      }
    }

    
  }


  
}
