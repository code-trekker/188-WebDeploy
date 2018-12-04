import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  constructor(private modalService: NgbModal, public router: Router) { }

  closeResult: string;
  data;
  columns;
  name: string;
  category;
  equipment: string;
  primary_muscle;
  secondary_muscle;

  editEid;
  editName:string;
  editCategory;
  editEquipment:string;
  editPrimaryMuscle;
  editSecondaryMuscle;


  ngOnInit() {

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
      this.data = response.data.exercises;
      // console.log(this.data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  

  addExercise() {
      // console.log(this.name);
      // console.log(this.category);
      // console.log(this.equipment);
      // console.log(this.primary_muscle);
      // console.log(this.secondary_muscle);

    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/add_exercise',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id"),
        name: this.name,
        category: this.category,
        equipment: this.equipment,
        primary_muscle: this.primary_muscle,
        secondary_muscle: this.secondary_muscle
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Exercise added!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
      
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  editExercise(selected: any) {
    console.log(selected.eid);
    this.editEid = selected.eid;
    this.editName = selected.name;
    this.editCategory = selected.category;
    this.editEquipment = selected.equipment;
    this.editPrimaryMuscle = selected.primary_muscle;
    this.editSecondaryMuscle = selected.secondary_muscle;
  }

  saveEdit(){
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/edit_exercise',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        eid: this.editEid,
        name: this.editName,
        category: this.editCategory,
        equipment: this.editEquipment,
        primary_muscle: this.editPrimaryMuscle,
        secondary_muscle: this.editSecondaryMuscle
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Exercise edited!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  removeExercise(selected:any) {
    console.log(selected.rid);

    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/remove_exercise',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        eid: selected.eid
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Exercise deleted!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  confirmDelete() {
    swal({
      position: 'center',
      type: 'success',
      title: 'Exercise deleted!',
      showConfirmButton: false,
      timer: 1000
    });
    // setTimeout(() => { location.reload(); }, 1000);
  }
}
