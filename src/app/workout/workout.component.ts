import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  workouts;
  routines;

  day;
  routine;
  notes;

  constructor(private modalService: NgbModal, public router: Router) { }

  ngOnInit() {
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/workouts',
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
      this.workouts = response.data.workouts;
    })
    .catch(error => {
      console.log(error)
    });

    //routine dropdown
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/routines',
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
      this.routines = response.data.routines;
    })
    .catch(error => {
      console.log(error)
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  addWorkout() {
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/add_workout',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id"),
        day: this.day,
        rid: this.routine,
        notes: this.notes
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Workout added!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
    })
    .catch(error => {
      console.log(error)
    });
  }

  removeWorkout(selected:any){
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/remove_workout',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        wid: selected.wid
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Workout deleted!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
      
    })
    .catch(error => {
      console.log(error)
    })
  }


}
