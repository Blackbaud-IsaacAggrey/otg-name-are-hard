import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export interface SearchHit {

}

export interface Aggregation {

}

export interface ErMahBox {

}

export interface Filter {

}

export interface SearchResult {
  totalHits: number;
  searchString: string;
  searchHits: SearchHit;
  aggregations: Aggregation;
}


@Injectable()
export class QueryService {
  private static _ermahBoxChecked: EventEmitter<ErMahBox>;
  private static _ermahBoxCleared: EventEmitter<ErMahBox>;
  private static _resultsUpdated: EventEmitter<SearchResult>;
  private static _filters: Filter[];

  constructor(private http: Http) {
    if (!QueryService._ermahBoxChecked) {
      QueryService._ermahBoxChecked = new EventEmitter<ErMahBox>();
    }
    if (!QueryService._ermahBoxCleared) {
      QueryService._ermahBoxCleared = new EventEmitter<ErMahBox>();
    }

    if (!QueryService._filters) {
      QueryService._filters = [];
    }

  }

  @Output()
  public get ermahBoxChecked(): EventEmitter<ErMahBox> {
    return QueryService._ermahBoxChecked;
  }

  @Output()
  public get ermahBoxCleared(): EventEmitter<ErMahBox> {
    return QueryService._ermahBoxCleared;
  }

  @Output()
  public get resultsUpdated(): EventEmitter<SearchResult> {
    return QueryService._resultsUpdated;
  }

  public query(ermahBox: ErMahBox): Observable<ErMahBox> {
    return this.http
      .post(`https://localhost:10010/nope`, {}) // NO THIS IS WRONG
        .map(response => response.json())
        .do((results) => QueryService._resultsUpdated.emit(results))
        .do(() => QueryService._ermahBoxChecked.emit(ermahBox));
  }
}
