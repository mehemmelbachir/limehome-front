import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './properties/list/list.component';
import { DetailComponent } from './properties/detail/detail.component';
import { ListItemComponent } from './properties/list/list-item/list-item.component';
import { BookingComponent } from './properties/booking/booking.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListComponent,
    DetailComponent,
    ListItemComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  entryComponents : [
    BookingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
