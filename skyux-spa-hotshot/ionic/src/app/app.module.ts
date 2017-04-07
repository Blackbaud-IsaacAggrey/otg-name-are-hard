import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { SocialComponent } from '../pages/social/social.component';
import { AppNavComponent } from '../pages/shared/app-nav.component';
import { SkyModule } from '@blackbaud/skyux/dist/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AppNavComponent,
    SocialComponent,
  ],
  imports: [
    BrowserModule,
    SkyModule,
    IonicModule.forRoot(MyApp),
    RouterModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SocialComponent,
    AppNavComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
