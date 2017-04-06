import { Component } from '@angular/core';
import { QueryService, ErMahBox } from '../shared/query.service';


@Component({
  selector: 'social',
  templateUrl: './social.component.html',
  providers: [ QueryService ]
})
export class SocialComponent {
  public checkboxes = [
    {
      name: 'VIP',
      filter: 'vip'
    },
    {
      name: 'Everyday',
      filter: 'everyday'
    },
    {
      name: 'Media Influencers',
      filter: 'media'
    }
  ];

  constructor(private service: QueryService) {
    this.service.query(["vip"])
        .subscribe(data => {
          console.log(data);
        })
  }
}
