import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { VendorRegistrationComponent } from './components/vendor-registration/vendor-registration.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component';
import { CompanyContactsComponent } from './components/company-contacts/company-contacts.component';
import { BankingInformationComponent } from './components/banking-information/banking-information.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VendorRegistrationComponent,
    VendorListComponent,
    BasicDetailsComponent,
    CompanyContactsComponent,
    BankingInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
