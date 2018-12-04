import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile;
  bmi;
  first_name;
  last_name;
  gender;
  birthday;
  lifestyle_type;
  workout_aim;
  weight;
  height;

  constructor(private modalService: NgbModal, public router: Router) { }

  ngOnInit() {
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/profile',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id")
      }
    })
    .then(response => {
      this.profile = response.data.profile;
      this.first_name = response.data.profile[0]["first_name"];
      this.last_name = response.data.profile[0]["last_name"];
      this.gender = response.data.profile[0]["gender"];
      this.birthday = response.data.profile[0]["birthday"];
      this.workout_aim = response.data.profile[0]["workout_aim"];
      this.lifestyle_type = response.data.profile[0]["lifestyle_type"];
      this.height = parseFloat(response.data.profile[0]["height"]);
      this.weight = parseFloat(response.data.profile[0]["weight"]);

      // localStorage.setItem("first_name", this.first_name);
      // localStorage.setItem("last_name", this.last_name);
      // localStorage.setItem("gender", this.gender);
      // localStorage.setItem("birthday", this.birthday);
      // localStorage.setItem("workout_aim", this.workout_aim);
      // localStorage.setItem("lifestyle_type", this.lifestyle_type);
      // localStorage.setItem("height", this.height);
      // localStorage.setItem("weight", this.weight);
      
      console.log(response.data.pid);
      localStorage.setItem("pid", response.data.pid);
      
      if (this.profile.weight === null || this.profile.height === null) {
        this.bmi = "";
      } else {
        this.bmi = this.weight/Math.pow(this.height, 2) * 10000;
        this.bmi = Math.round(this.bmi * 100)/100;
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  editProfile() {    
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/edit_profile',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id"),
        pid: localStorage.getItem("pid"),
        first_name: this.first_name,
        last_name: this.last_name,
        gender: this.gender,
        birthday: this.birthday.toString(),
        workout_aim: this.workout_aim,
        lifestyle_type: this.lifestyle_type,
        weight: this.weight.toString(),
        height: this.height.toString()
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Profile edited!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
    })
    .catch(error => {
      console.log(error)
    });
  }

}
