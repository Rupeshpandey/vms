import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banking-information',
  templateUrl: './banking-information.component.html',
  styleUrls: ['./banking-information.component.css']
})
export class BankingInformationComponent {

  @Output() formValid = new EventEmitter<{ valid: boolean; data: any }>();
  @ViewChild('bankingForm') bankingForm!: NgForm;
  @Input() parentComponent: any;

  bankingInformation = {
    vendorID: 0,
    bankName: '',
    IFSCCode: '',
    accountNumber: '',
    Branch:'',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.formValid.emit({ valid: false, data: this.bankingInformation });
  }

  checkFormValidity() {
    this.formValid.emit({ valid: this.bankingForm?.valid ?? false, data: this.bankingInformation });
  }

  onFormChange(isValid: boolean) {
    this.checkFormValidity();
  }
  

  

  continue() {
    this.checkFormValidity();
    if (this.bankingForm.valid) {
      this.formValid.emit({ valid: true, data: this.bankingInformation });
    }
  }
  resetForm() {
    debugger;
    this.bankingInformation = {
      vendorID: 0,
      bankName: '',
      IFSCCode: '',
      accountNumber: '',
      Branch:'',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bankingForm.resetForm(this.bankingInformation);
    this.formValid.emit({ valid: false, data: this.bankingInformation });
  }

  // resetForm() {
  //     this.bankingForm.resetForm();
  //     this.formValid.emit({ valid: false, data: this.bankingInformation });
    
  // }
  

  

}
