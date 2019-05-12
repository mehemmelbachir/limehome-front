import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, startWith, tap, map, takeWhile } from 'rxjs/operators';
import { Observable, Subject, interval } from 'rxjs';

import { PropertiesService } from '@services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  properties$: Observable<any[]>;
  searchTerm$ = new Subject<string>();
  nextUrl : string;

  constructor(private propertiesService : PropertiesService) { }

  ngOnInit() {
    this.propertiesService.getPosition().then(data => {
      this.properties$ = this.searchTerm$.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => this.propertiesService.getProperties(term)),
        // Map to extract properties array
        map(resp => resp['results']['items']),
      )
    })
  }

  search(term){
    this.searchTerm$.next(term);
  }

}
