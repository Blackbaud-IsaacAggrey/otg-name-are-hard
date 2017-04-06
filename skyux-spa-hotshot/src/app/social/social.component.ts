import { Component } from '@angular/core';

@Component({
  selector: 'social',
  templateUrl: './social.component.html'
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

  constructor() {}
}
