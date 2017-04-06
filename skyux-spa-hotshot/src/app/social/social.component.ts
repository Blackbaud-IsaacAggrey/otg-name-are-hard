import { Component } from '@angular/core';
import { QueryService, ErMahBox } from '../shared/query.service';


@Component({
  selector: 'social',
  templateUrl: './social.component.html',
  providers: [ QueryService ]
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

  get resultsAvailable() {
    return false;
  }

  constructor(private service: QueryService) {
    this.service.query(["vip"])
        .subscribe(data => {
          console.log(data);
        })
  }
}
