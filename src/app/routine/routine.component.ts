import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {filter, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit {
  form: FormGroup;
  private fieldArray: Array<any> = [];
  private selectedExercises: Array<any> = [];
  private newRoutineExercise: Array<any> = [];
  private newAttribute: any = {};
  private exerciseNames: Array<any> = [];
  constructor(private modalService: NgbModal, public router: Router) { }
  
  data;
  p1;
  exercises;
  show1: boolean = true;
  name;
  muscle_area;

  editRid;
  editName;
  editExercises;
  editMuscleArea;
  

  ngOnInit() {
    // this.fieldArray.push(this.newAttribute);
    // this.newAttribute = {};

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
      this.data = response.data.routines;
      // console.log(response.data.routines);
    })
    .catch(error => {
      console.log(error)
    });
    //for exercises dropdown
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/exercises',
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
      this.exercises = response.data.exercises;
      // console.log(this.exercises);
    })
    .catch(error => {
      console.log(error)
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  addFieldValue(index) {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
      this.selectedExercises.splice(index, 1);
      this.exerciseNames.splice(index,1);
      console.log(this.selectedExercises);  
  }

  getData(item) {
    this.selectedExercises.push(item.eid);
    this.exerciseNames.push(item.name);
    console.log(this.selectedExercises);
    console.log(this.fieldArray);
    console.log(this.exerciseNames);
    console.log(item)
  }
  
  addRoutine() {
    console.log(this.name);
    console.log(this.muscle_area);
    console.log(this.selectedExercises);

    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/add_routine',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id"),
        name: this.name,
        exercise_list: this.selectedExercises,
        muscle_area: this.muscle_area
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Routine added!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
    })
    .catch(error => {
      console.log(error)
    });
  }

  editRoutine(selected: any){
    console.log(selected.rid);
    this.editRid = selected.rid;
    this.editName = selected.name;
    this.editMuscleArea = selected.muscle_area;
    this.selectedExercises = selected.eid;
    console.log(selected.eid);
    this.fieldArray = this.selectedExercises;
  }

  removeRoutine(selected:any) {
    console.log(selected.rid);

    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/remove_routine',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        rid: selected.rid
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Routine deleted!',
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
