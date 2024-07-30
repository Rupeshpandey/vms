import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs'; // Import Subscription if you have observables

type VendorCompositeModelKey = keyof VendorCompositeModel;

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css']
})
export class VendorRegistrationComponent implements OnInit, OnDestroy {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('basicForm') basicForm!: NgForm;
  @ViewChild('companyForm') companyForm!: NgForm;
  @ViewChild('bankingForm') bankingForm!: NgForm;

  isTabValid: { [key in VendorCompositeModelKey]: boolean } = {
    vendor: false,
    companyContact: false,
    bankingInformation: false
  };
  
  formData: VendorCompositeModel = this.initializeFormData();

  private subscriptions: Subscription[] = []; // For managing subscriptions

  constructor(private vendorService: VendorService, private router: Router) {}

  ngAfterViewInit() {
    console.log('Basic form:', this.basicForm);
    console.log('Company form:', this.companyForm);
    console.log('Banking form:', this.bankingForm);

    // Ensure forms are initialized before calling resetAllForms()
    setTimeout(() => {
      this.resetAllForms();
    }, 0);
  }

  ngOnInit(): void { 
    // Initialization logic here
  }

  ngOnDestroy(): void {
    // Cleanup logic here
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onFormValid(tab: VendorCompositeModelKey, event: { valid: boolean; data: any }) {
    this.isTabValid[tab] = event.valid;
    this.formData[tab] = event.data;
    if (event.valid && tab !== 'bankingInformation') {
      this.continue(); 
    }
  }

  continue() {
    const currentIndex = this.tabGroup?.selectedIndex;
    if (currentIndex !== null && currentIndex !== undefined) {
      if (currentIndex < 2) {
        this.tabGroup.selectedIndex = currentIndex + 1;
      } else {
        if (Object.values(this.isTabValid).every(valid => valid)) {
          this.submitForm();
        } else {
          this.highlightInvalidForms();
        }
      }
    } else {
      console.error('Current index is not available');
    }
  }

  submitForm() {
    this.vendorService.insertVendor(this.formData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Vendor registration successful!',
        });
        this.resetAllForms();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Vendor registration failed. Please try again.',
        });
      }
    );
  }

  resetFormData() {
    console.log('Before reset: ', this.formData);
    this.formData = this.initializeFormData(); // Reset data model
    console.log('After reset: ', this.formData);
    this.isTabValid = {
        vendor: false,
        companyContact: false,
        bankingInformation: false
    };
    this.navigateToTab(0);
  }

  resetAllForms() {
    debugger;
    console.log('Resetting forms...');
    console.log('Basic form:', this.basicForm);
    console.log('Company form:', this.companyForm);
    console.log('Banking form:', this.bankingForm);
    if (this.basicForm) {
        console.log('Basic form before reset:', this.basicForm);
        this.basicForm.resetForm();
        console.log('Basic form after reset:', this.basicForm);
    }
    else 
    {
      console.warn('Basic form is undefined');
    }
    if (this.companyForm) {
        console.log('Company form before reset:', this.companyForm);
        this.companyForm.resetForm();
        console.log('Company form after reset:', this.companyForm);
    }
    else 
    {
      console.warn('Company form is undefined');
    }
    if (this.bankingForm) {
        console.log('Banking form before reset:', this.bankingForm);
        this.bankingForm.resetForm();
        console.log('Banking form after reset:', this.bankingForm);
    }
    else 
    {
      console.warn('Banking form is undefined');
    }
    
    this.resetFormData();
  }

  initializeFormData(): VendorCompositeModel {
    return {
      vendor: {
        vendorID: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        mobile: '',
        dob: new Date(),
        panCard: '',
        profileImage: '',
        languagePreference: {
          hindi: false,
          english: false
        },
        district: '',
        block: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      companyContact: {
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
        updatedAt: new Date()
      },
      bankingInformation: {
        vendorID: 0,
        bankName: '',
        IFSCCode: '',
        accountNumber: '',
        Branch: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }; 
  }

  highlightInvalidForms() {
    const invalidTabs = Object.keys(this.isTabValid).filter(tab => !this.isTabValid[tab as VendorCompositeModelKey]);
    alert('Some forms are invalid. Please complete all forms.');
  }

  onTabChange(event: any): void {
    console.log('Tab changed to', event.index);
  }

  navigateToTab(index: number) {
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = index;
    } else {
      console.error('tabGroup is not available');
    }
  }

  vendorlist() {
    this.router.navigate(['/vendor-list']);
  }
}
