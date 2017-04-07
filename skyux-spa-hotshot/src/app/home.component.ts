import { Component } from '@angular/core';
import { QueryService, SearchResult } from './shared/query.service';
import { ListSortFieldSelectorModel } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'social',
  templateUrl: './home.component.html',
  providers: [ QueryService ],
  styleUrls: ['./home.component.scss']
})
export class SocialComponent {
  private _results: SearchResult = { searchHits: [] };

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
      description: 'Near me:',
      filter: 'location',
      checked: false,
      disabled: false
    }
  ];

  public locationRadiusOptions = SocialComponent._getLocationRadiusOptions();

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
    };
  }

  get selectedRadius() {
    let selection = this.locationRadiusOptions.filter((option) => {
      return option.selected === true;
    });
    return selection.length > 0 ? selection[0] : this.locationRadiusOptions[0];
  }

  public selectRadius(radiusOption) {
    this.locationRadiusOptions.map((elem) => {
      elem.selected = false;
    });
    radiusOption.selected = true;
  }

  public loadErMahResults () {
    this.service.socialTags = this.selectedSocialTags;
    if (this.locationFilters[0].checked) {
      this.service.distance = this.selectedRadius.radius;
      this.service.location = this.location;
    } else {
      delete this.service.location;
    }
    this.service.query()
        .subscribe(data => {
          this._results = data;
          // console.log(this._results.searchHits);
          this._results.searchHits.forEach((item, i) => {
            item.fullName = item.fields.cons_name.first + ' ' + item.fields.cons_name.last;
            item.id = i + 1;
          });
        });
  }

  public beCurrency(dollar) {
    // return $filter('currency')(dollar, '$');
  }

  public clearResults() {
    this._results.searchHits = [];
  }

  get totalHits() {
    return this.results.totalHits || 0;
  }

  get emails() {
    return this._results.searchHits.map((result) => {
      return result.fields.email[0].address; // TODO: deal with jerks that don't have emails
    })
  }

  public sortChanged(activeSort: ListSortFieldSelectorModel) {
    // console.log(activeSort);
  }

  static _getLocationRadiusOptions() {
    return [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((radius) => {
      return {
        radius,
        description: `${radius} miles`,
        selected: radius === 5 ? true : false
      };
    });
  }

  constructor(private service: QueryService) {}
}
