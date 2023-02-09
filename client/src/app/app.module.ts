
import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Http Client
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,  HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
