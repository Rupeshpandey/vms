import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-contacts',
  templateUrl: './company-contacts.component.html',
  styleUrls: ['./company-contacts.component.css']
})
export class CompanyContactsComponent {

  @Output() formValid = new EventEmitter<{ valid: boolean, data: any }>();
  @ViewChild('companyForm') companyForm!: NgForm;
  @Input() parentComponent: any;

  companyContact = {
    vendorID: 0,
    companyName: '',
    telephone: '',
    fax: '',
    email: '',
    pointOfContactName: '',
    title: '',
    contactPhone1: '',
    mailingAddress: '',
    website: '',
    contactEmail: '',
    contactPhone2: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };


  constructor(private router: Router) {
    
   }

  ngOnInit() {
    this.formValid.emit({ valid: false, data: this.companyContact }); 
  }



  checkFormValidity() {
    this.formValid.emit({ valid: this.companyForm.valid ?? false, data: this.companyContact });
  }

  continue(form: NgForm) {
    debugger
    this.checkFormValidity();
    if (this.companyForm.valid) {
      this.formValid.emit({ valid: true, data: this.companyContact });
    }
  }

  resetForm() {
    debugger;
    this.companyContact = {
      vendorID: 0,
      companyName: '',
      telephone: '',
      fax: '',
      email: '',
      pointOfContactName: '',
      title: '',
      contactPhone1: '',
      mailingAddress: '',
      website: '',
      contactEmail: '',
      contactPhone2: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.companyForm.resetForm(this.companyContact);
    this.formValid.emit({ valid: false, data: this.companyContact });
  }

  // resetForm() {
  //     this.companyForm.resetForm();
  //     this.formValid.emit({ valid: false, data: this.companyContact });
    
  // }
  

  


  onTabChange(event: any): void {
    console.log('Tab changed to', event.index);
  }

  onMobileNumberInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  onFormChange() {
    this.checkFormValidity();
  }


}
