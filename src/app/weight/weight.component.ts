import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  constructor(private modalService: NgbModal, public router: Router) { }

  data;
  weight;
  date;
  

  ngOnInit() {
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/weights',
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
      this.data = response.data.weights;
      // console.log(this.data);
    })
    .catch(error => {
      console.log(error)
    })
  }


  open(content) {
    this.modalService.open(content);
  }


  addWeight() {
    // console.log(this.weight);
    // console.log(this.date);

    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/add_weight',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id"),
        date: this.date,
        weight: this.weight,
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Entry added!',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => { location.reload(); }, 1000);
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  removeWeight(selected:any) {
    // console.log(selected.weid)
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/remove_weight',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        weid: selected.weid
      }
    })
    .then(response => {
      console.log(response.data);
      swal({
        position: 'center',
        type: 'success',
        title: 'Entry deleted!',
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
