import { Component } from '@angular/core';
import { QueryService, ErMahBox } from '../shared/query.service';
import { ListSortFieldSelectorModel } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'social',
  templateUrl: './social.component.html',
  providers: [ QueryService ],
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  public socialFilters = [
    {
      description: 'VIP',
      filter: 'vip',
      checked: false,
      disabled: false
    },
    {
      description: 'Everyday',
      filter: 'everyday',
      checked: false,
      disabled: false
    },
    {
      description: 'Media Influencers',
      filter: 'media',
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

  private _results;

  get resultsAvailable() {
    return typeof this._results !== 'undefined';
  }

  get results() {
    return this._results || [];
  }

  public loadErMahResults() {
    this._results = [
      {
        id: 1,
        donorName: "Frodo Baggins",
        lastTransaction: "$1,000,000",
        lifetimeTransaction: "$100,000,000"
      },
      {
        id: 2,
        donorName: "Gollum",
        lastTransaction: "-$50,000",
        lifetimeTransaction: "-$100,000"
      },
      {
        id: 3,
        donorName: "Smeagol",
        lastTransaction: "$50,000",
        lifetimeTransaction: "-$100,000"
      }
    ];
  }

  public clearResults() {
    delete this._results;
  }

  public sortChanged(activeSort: ListSortFieldSelectorModel) {
    // console.log(activeSort);
  }

  constructor(private service: QueryService) {
    this.service.query(["vip"])
        .subscribe(data => {
          console.log(data);
        })
  }
}
