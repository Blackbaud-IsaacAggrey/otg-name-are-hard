import { Component } from '@angular/core';
import { QueryService, ErMahBox, SearchResult, Location } from '../shared/query.service';
import { ListSortFieldSelectorModel } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'social',
  templateUrl: './social.component.html',
  providers: [ QueryService ],
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  private _results: SearchResult = { searchHits: []};

  public socialFilters = [
    {
      description: 'VIP',
      filter: "vip",
      checked: false,
      disabled: false
    },
    {
      description: 'Everyday',
      filter: "everyday",
      checked: false,
      disabled: false
    },
    {
      description: 'Media influencers',
      filter: "media",
      checked: false,
      disabled: false
    }
  ];

  public locationFilters = [
    {
      description: 'Near me (\<TEMPLATE ME\> mi)',
      filter: 'location',
      checked: false,
      disabled: false
    }
  ];

  get resultsAvailable() {
    return this._results.searchHits.length > 0;
  }

  get results() {
    return this._results || [];
  }

  get selectedSocialTags() {
    return this.socialFilters.filter((item) => {
      return item.checked;
    }).map((checkedItem) => {
      console.log(checkedItem.filter);
      return checkedItem.filter;
    })
  }



  get location () {
      return {
        latitude: 30.35332,
         longitude: -97.7444
      }
  }

  public loadErMahResults () {
    this.service.socialTags = this.selectedSocialTags;
    if (this.locationFilters[0].checked) {
      this.service.location = this.location;
    }
    this.service.query()
        .subscribe(data => {
          this._results = data;
          this._results.searchHits.forEach((item, i) => {
            item.fullName = item.fields.cons_name.first + ' ' + item.fields.cons_name.last;
            item.id = i + 1;
          });
        });
  }

  public clearResults() {
    this._results.searchHits = [];
  }

  public sortChanged(activeSort: ListSortFieldSelectorModel) {
    // console.log(activeSort);
  }

  constructor(private service: QueryService) {
  }
}
