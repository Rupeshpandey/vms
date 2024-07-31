import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendors: VendorCompositeModel[] = [];

  constructor(private vendorService: VendorService, private router: Router) { }

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.getVendors().subscribe(
      data => { this.vendors = data;
        console.log(this.vendors);
      },
      error => console.error('Error loading vendors', error)
    );
    
  }

  navigateToRegistration(): void {
    this.router.navigate(['/vendor-registration']);
  }

  editVendor(id: number): void {
    this.router.navigate(['/vendor-registration'], { state: { vendorId: id } });
  }

  deleteVendor(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vendorService.deleteVendor(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'The vendor has been deleted.', 'success');
            this.loadVendors(); // Refresh the vendor list
          },
          error => Swal.fire('Error!', 'There was an error deleting the vendor.', 'error')
        );
      }
    });
  }
}
