import {Component, input, output} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {Hero} from './hero';

@Component({
  selector: 'app-hero-list-enter-leave',
  template: `
    <ul class="heroes">
      @for (hero of heroes(); track hero) {
        <li [@flyInOut]="'in'">
          <button class="inner" type="button" (click)="removeHero(hero.id)">
            <span class="badge">{{ hero.id }}</span>
            <span class="name">{{ hero.name }}</span>
          </button>
        </li>
      }
    </ul>
  `,
  styleUrls: ['./hero-list-page.component.css'],
  // #docregion animationdef
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [style({transform: 'translateX(-100%)'}), animate(100)]),
      transition('* => void', [animate(100, style({transform: 'translateX(100%)'}))]),
    ]),
  ],
  // #enddocregion animationdef
})
export class HeroListEnterLeaveComponent {
  heroes = input<Hero[]>([]);

  remove = output<number>();

  removeHero(id: number) {
    this.remove.emit(id);
  }
}
