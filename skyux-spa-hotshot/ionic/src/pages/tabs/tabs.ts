import { Component } from '@angular/core';

import { SocialComponent } from '../social/social.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SocialComponent;

  constructor() {

  }
}
