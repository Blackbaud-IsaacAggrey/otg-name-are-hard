import { Component, OnInit } from '@angular/core';
import { QueryService, SearchResult } from '../shared/query.service';

@Component({
  selector: 'social',
  templateUrl: './social.component.html',
  providers: [ QueryService ],
  //styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  private _results: SearchResult = { searchHits: [] };
  private userPosition: Coordinates = {
      latitude: 30.35332,
      longitude: -97.7444,
      accuracy: 0.0,
      altitude: 0.0,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    };

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
      return checkedItem.filter;
    })
  }

  get location () {
    return this.userPosition;
  }

  get selectedRadius() {
    let selection = this.locationRadiusOptions.filter((option) => {
      return option.selected === true;
    });
    return selection.length > 0 ? selection[0] : this.locationRadiusOptions[0];
  }

  get mailAddress() {
    let emailList = '';
    if (this.emails.length > 0) {
      emailList = this.emails.join()
    }

    return `mailto:nerds@ermernerds.com?subject=WudUp Nerds!&bcc=${emailList}`;
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
          this._results.searchHits.forEach((item, i) => {
            item.fullName = item.fields.cons_name.first + ' ' + item.fields.cons_name.last;
            item.id = i + 1;
            item.influencerType = item.fields.social.aiTags;
          });
        });
  }

  private getIcon(value) {
    return value === 'vip' ? 'trophy' : value === 'media' ? 'newspaper-o' : value === 'everyday' ? 'bullhorn' : '';
  }

  get totalHits() {
    return this.results.totalHits || 0;
  }

  get emails() {
    return this._results.searchHits.map((result) => {
      return result.fields.email[0].address; // TODO: deal with jerks that don't have emails
    })
  }

  static _getLocationRadiusOptions() {
    return [5, 20, 50, 100, 300].map((radius) => {
      return {
        radius,
        description: `${radius} miles`,
        selected: radius === 5 ? true : false
      };
    });
  }

  constructor(private service: QueryService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.userPosition = pos.coords;
    });
  }
}
