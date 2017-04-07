import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export interface SearchHit {
  id? : any;
  fullName?: string;
  influencerType?: string;
  fields: any;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface SearchResult {
  totalHits?: number;
  scrollId?: string;
  searchString?: string;
  searchHits?: SearchHit[];
  aggregations?: any;
}

@Injectable()
export class QueryService {
  private static _resultsUpdated: EventEmitter<SearchResult>;
  public location: Location;
  public distance: number;
  public socialTags: string[];

  constructor(private http: Http) {
  }

  @Output()
  public get resultsUpdated(): EventEmitter<SearchResult> {
    return QueryService._resultsUpdated;
  }

  public query(): Observable<any> {
    let filters = [];
    if (this.socialTags.length > 0) {
      filters.push({"type":"value","field":"social.aiTags",
        "values":this.socialTags});
    }

    if (this.location) {
      filters.push({"type":"geo",
        "field":"geolocation","distance":`${this.distance}mi`,"latitude":this.location.latitude,"longitude":this.location.longitude,
        "address":"deez nuts"})
    }
    return this.http
      .post(`https://localhost:8000/api/segment/constituents?set_from=0&set_size=20`,
          {"filters":filters,
            "fieldSorts":[{"field":"cons_name.last","ordering":"ASCENDING"},
              {"field":"cons_name.first","ordering":"ASCENDING"}],"returnedFields":[]}) // NO THIS IS WRONG
        .map(response => response.json());
  }
}
