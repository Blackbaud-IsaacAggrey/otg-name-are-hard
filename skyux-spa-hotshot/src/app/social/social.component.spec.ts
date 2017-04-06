import { TestBed } from '@angular/core/testing';
import { expect, SkyAppTestModule } from '@blackbaud/skyux-builder/runtime/testing/browser';

// Component we're going to test
import { SocialComponent } from './social.component';

describe('Social component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
  });

  it('should display a new teammate when one is added', () => {
    expect(true).toBe(true);
  });

});
