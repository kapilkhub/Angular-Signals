import { Injectable, computed, signal } from "@angular/core";
import { combineLatest, map, scan, shareReplay, Subject } from "rxjs";
import { Vehicle } from "../vehicles/vehicle";
import { Action, CartItem } from "./cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems = signal<CartItem[]>([] as CartItem[]);

  // Total up the extended price for each item
  subTotal = computed(() => this.cartItems().reduce((a, b) => a + (b.quantity * Number(b.vehicle.cost_in_credits)), 0));

  // Delivery is free if spending more than 100,000 credits
  deliveryFee = computed(() => this.subTotal() < 100000 ? 999 : 0);


  // Tax could be based on shipping address zip code
tax = computed(() => Math.round(this.subTotal()) * 10.75 / 100)


  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax())

  // Add the vehicle to the cart as an Action<CartItem>
  addToCart(vehicle: Vehicle): void {
    const index = this.cartItems().findIndex(v => v.vehicle.name == vehicle.name);
    if (index == -1) {
      this.cartItems.update(items => [...items, { vehicle: vehicle, quantity: 1 }])
    }
    else {
      this.cartItems.update((items: CartItem[]) => [
        ...items.slice(0, index),
        { ...items[index], quantity: items[index].quantity + 1 },
        ...items.slice(index + 1)
      ])
    }
  }

  // Remove the item from the cart
  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update((items: CartItem[]) => items.filter(item => item.vehicle.name!== cartItem.vehicle.name));
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    // Update the cart with a new array containing
    // the updated item and all other original items
    this.cartItems.update(items =>
      items.map(item => item.vehicle.name === cartItem.vehicle.name ?
        { vehicle: cartItem.vehicle, quantity } : item));
  }

  

}
