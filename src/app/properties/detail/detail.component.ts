import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PropertiesService } from '@services';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  property : any;
  booked : boolean = false;

  constructor(private route : ActivatedRoute,
              private propertiesService : PropertiesService,
              private ngbModal : NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      return this.propertiesService.getProperty(params['PROPERTY_ID'])
      .then(data => {
        // console.log(data);
        this.property = data
      })
    })
  }

  openBookingForm(){
    let ngbModelRef = this.ngbModal.open(BookingComponent)
    ngbModelRef.componentInstance.property = this.property;
    ngbModelRef.result.then(data => {
      if(data){
        this.booked = true;
      }
    }, reason => {})
  }

}
