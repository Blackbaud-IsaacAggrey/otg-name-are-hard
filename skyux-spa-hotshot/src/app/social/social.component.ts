import { Component } from '@angular/core';
import { QueryService, ErMahBox, SearchResult } from '../shared/query.service';
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

  get checkedItems() {
    return this.socialFilters.filter((item) => {
      return item.checked;
    }).map((checkedItem) => {
      console.log(checkedItem.filter)
      return checkedItem.filter;
    })
  }

  public loadErMahResults () {

    this.service.query(this.checkedItems)
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
