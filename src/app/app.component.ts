import { Component, OnInit, signal, computed, effect, inject } from '@angular/core';
import { filter, interval, map, mapTo, scan, takeWhile, tap } from 'rxjs';

interface Vehicle {
  id: number;
  name: string;
  price: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'av-16';
  quantity = signal(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);
  selectedVehicle = signal<Vehicle>({id: 1, name: 'VW', price: 10000});
  vehicle = signal<Vehicle[]>([]);
  exPrice = computed(() => this.selectedVehicle().price * this.quantity());
  color = computed(() => this.exPrice() > 50000 ? 'green' : 'blue');

  constructor() {
    this.selectedVehicle.mutate(val => val.price = val.price + (val.price * 0.2));

  }

  ngOnInit(): void {
    // this.test();
    // this.testSignal();
    // this.playCountDowntimer();
    // this.findMario();
    // this.update()

  }

  qtyEff = effect(() => console.log('Latest Qty from Effect', this.quantity()));
  
  onQuantitySelected(qty: number) {
    this.quantity.set(qty);
  }

  test() {
    let x = 5;
    let y = 3;
    let z = x + y;
    console.log('z1', z);
    x = 10;
    console.log('z2', z);
  }

  testSignal() {
    const x = signal(5);
    const y = signal(3);
    const z = computed(() => x() + y());
    console.log('z1', z());
    // x.set(10);
    x.update(val => val * 3);
    console.log('z2', z());
    
  }

  /**
   * Runs the timer from 10 to 0
   */
  playCountDowntimer() {
    const counter$ = interval(1000);
    counter$.pipe(
      map(() => -1),
      scan((accumulator, current) => {
        return accumulator + current;
      }, 10),
      tap(val => console.log('Before filter', val)),
      takeWhile(val => val >= 0)
      // filter(val => val >= 0),
      /*
      Here to differentiate why we have ti use takeWhile instead of filter.
      filter - when using filter count down will stop by 0. But streaming dont stop (i.e from the tap 'Before filter' keeps on running)
      takeWhile - when using filter count down will stop by 0 and streaming will stop in -1.
      */
    )
      .subscribe(res => console.log('countdown ⏱', res));
  }

  findMario() {
    const playerName = 'Mario';
    const players = ['Luigi', 'Toad', 'Bowser', 'Donkey Kong', 'Goomba', 'Mario', 'Kamek', 'King Boo', 'Princess Peach'];
    for (let i = 0; i < players.length; i++) {
      console.log('Search Mario');
      if (players[i] === playerName) {
        console.log('Found Mario');
        break; // If we don't add break here, for loop call 3 more times
      }
    }
  }

  /**
   * find Mario from list of arrays
   */
  update() {
    const customer = {
      name: 'Peter',
      address: {
        city: 'Toronto',
        postalCode: 'A1B3G4'
      }
    };
    // Incase if we need to update the city we shoudn't do like below:
    // Since it will update in both customer and newCustomer
    /*
    const newCustomer = customer;
    newCustomer.address.city = 'Montreal';
    console.log('customer', customer);
    console.log('newCustomer', newCustomer);
    */

    // Instead use spread operator to make shallow copy and update
    const newCustomer = { ...customer, address: { ...customer.address, city: 'Montreal' } };
    console.log('customer', customer);
    console.log('newCustomer', newCustomer);
  }

  

}
