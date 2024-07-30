import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PanverificationService } from 'src/app/services/panverification.service';
import { DistrictsService } from 'src/app/services/districts.service';
import { BlocksService } from 'src/app/services/blocks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {

  @Output() formValid = new EventEmitter<{ valid: boolean, data: any }>();
  @ViewChild('basicForm') basicForm!: NgForm;
  @Input() parentComponent: any;
  

  vendor = {
    vendorID: 1,
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    mobile: '',
    dob: '',
    panCard: '',
    profileImage: '',
    languagePreference: {
      hindi: false,
      english: false
    },
    district: '',
    block: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  districts: string[] = [];
  blocks: string[] = [];
  fileValid = true;

  constructor(private router: Router, 
    private panverificationService: PanverificationService,
    private districtsService: DistrictsService,
    private blocksService: BlocksService) {}

  ngOnInit() {
    this.formValid.emit({ valid: false, data: this.vendor });
    this.loadDistricts();
  }

  loadDistricts() {
    this.districtsService.getDistricts().subscribe(
      (data: any[]) => {
        this.districts = data.map(district => district.district_Name); // Map to district_Name from API response
        console.log('Districts:', this.districts);  
      },
      (error) => {
        console.error('Error loading districts', error);
        // Handle error (e.g., show error message to user)
      }
    );
  }
  
  loadBlocks(districtId: number) {
    this.blocksService.getBlocks(districtId).subscribe(
      (data: any[]) => {
        this.blocks = data.map(block => block.block_Name);
        console.log('Blocks:', this.blocks);  
      },
      (error) => {
        console.error('Error loading blocks', error);
        // Handle error (e.g., show error message to user)
      }
    );
  }

  onDistrictChange() {
    console.log('District changed:', this.vendor.district);
    const districtId = Number(this.vendor.district);
    console.log('Parsed districtId:', districtId);
    if (!isNaN(districtId)) {
      this.loadBlocks(districtId);
    } else {
      console.log('Invalid districtId:', this.vendor.district);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.vendor.profileImage = reader.result as string;
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
    }
  }

  checkFormValidity() {
    this.formValid.emit({ valid: this.basicForm.valid ?? false, data: this.vendor });
  }

  onFormChange() {
    this.checkFormValidity();
  }

  continue() {
    this.checkFormValidity();
    if (this.basicForm.valid) {
      this.formValid.emit({ valid: true, data: this.vendor });
    }
  }

  resetForm() {
    this.vendor = {
      vendorID: 1,
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      mobile: '',
      dob: '',
      panCard: '',
      profileImage: '',
      languagePreference: {
        hindi: false,
        english: false
      },
      district: '',
      block: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.basicForm.resetForm(this.vendor);
    this.formValid.emit({ valid: false, data: this.vendor });
  }

  onMobileNumberInput(event: any): void {
    const input = event.target;
    const value = input.value;
    
    // Remove non-numeric characters
    input.value = value.replace(/[^0-9]/g, '');

    // Update the model value
    this.vendor.mobile = input.value;
  }

  // resetForm() {
  //   this.basicForm.resetForm();
  //   this.formValid.emit({ valid: false, data: this.vendor });
  //   }
  
}
