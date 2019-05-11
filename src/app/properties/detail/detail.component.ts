import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertiesService } from '@services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  property : any;

  constructor(private route : ActivatedRoute,
              private propertiesService : PropertiesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      return this.propertiesService.getProperty(params['PROPERTY_ID'])
      .then(data => {
        console.log(data);
        this.property = data
      })
    })
  }

}
