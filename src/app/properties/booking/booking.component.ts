import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDate, NgbCalendar, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BookingService } from '@services';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass'],
  providers : [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class BookingComponent implements OnInit {

  @Input() property : any;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  rForm : FormGroup

  constructor(public activeModal : NgbActiveModal,
              private calendar : NgbCalendar,
              private bookingService : BookingService,
              private fb : FormBuilder,
              private adapter : NgbDateAdapter<Date>) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.createForm()
  }

  createForm(){
    this.rForm = this.fb.group({
      'email' : [null, Validators.compose([Validators.email, Validators.required])],
      'fullName' : [null, Validators.required]
    })
  }

  submit(){
    let booking = {};
    booking['user'] = this.rForm.value;
    booking['fromDate'] = this.adapter.toModel(this.fromDate);
    booking['toDate'] = this.adapter.toModel(this.toDate);
    booking['property_id'] = this.property.placeId;
    booking['property_name'] = this.property.name;
    booking['city'] = this.property.location.address.city
    this.bookingService.addBooking(booking)
    .then(data => {
      this.activeModal.close(data)
    })
  }

  // NGB Datepicker functions
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  // END NGB Datepicker functions

}
