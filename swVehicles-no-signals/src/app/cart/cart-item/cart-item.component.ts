import { Component, Input, computed, input, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BehaviorSubject, map, tap } from 'rxjs';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  // Use a setter to emit whenever a new item is set
  item = input.required<CartItem>();
  // Hard-coded quantity
  // These could instead come from an inventory system
  qtyArr = signal([1, 2, 3, 4, 5, 6, 7, 8]);



  exPrice = computed(() => this.item().quantity * Number(this.item()?.vehicle.cost_in_credits) )
  constructor(private cartService: CartService) { }

  onQuantitySelected(quantity: number): void {
    // Update the quantity in the item
    this.cartService.updateInCart(this.item(), Number(quantity));
  }

  onRemove(): void {
    this.cartService.removeFromCart(this.item());
  }
}
