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
}


