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
    const name = 'Blackbaud';
    const filterName = 'coolguys';
    const fixture = TestBed.createComponent(SocialComponent);

    fixture.componentInstance.socialFilters.push({
      description: name,
      filter: filterName,
      checked: true,
      disabled: false
    });

    fixture.detectChanges();

    const el = fixture.nativeElement;
    const lastSocialFilterDiv = el.querySelector('.social-container:last-child');
    const checkboxEl = lastSocialFilterDiv.querySelector('sky-checkbox');
    const labelEl = checkboxEl.querySelector('sky-checkbox-label');

    // Using custom expect matchers
    expect(labelEl).toHaveText(name);
  });

});
