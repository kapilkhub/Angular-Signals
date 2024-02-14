import { Component, computed, inject } from '@angular/core';
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';
import { EMPTY, catchError } from 'rxjs';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);
 
  vehicles = computed(()=>{
    try {
     return  this.vehicleService.vehicles()
    } catch (error) {
      this.errorMessage = typeof error === 'string'? error : 'Error';
      return [] as Vehicle[]
    }
  })

  selectedVehicle = this.vehicleService.selectedVehicle;

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

}
