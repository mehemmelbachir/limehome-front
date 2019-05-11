import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit {

  @Input() property;

  constructor() { }

  ngOnInit() {
  }

}
