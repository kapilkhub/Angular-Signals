import { Component, computed, inject, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-detail',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent {
  errorMessage = '';
  cartService = inject(CartService);
  vehicleService = inject(VehicleService);

   

  vehicle = this.vehicleService.selectedVehicle;

 

  pageTitle = computed(() => this.vehicle()?  `Detail for: ${this.vehicle()?.name}` : '' )

  vehicleFilms = this.vehicleService.vehicleFilms;

  addToCart(vehicle: Vehicle| undefined) {
    if(vehicle)
      this.cartService.addToCart(vehicle);
  }
}
