import { Component, OnInit } from '@angular/core';
import { filter, interval, map, mapTo, scan, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'av-16';

  ngOnInit(): void {
    this.playCountDowntimer();
    this.findMario();
    this.update()
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
