import { trigger, transition, style, query, group, animateChild, animate, keyframes } from '@angular/animations';

export const slide =
  trigger('routeAnimation', [
    transition('right => left', slideTo('right') ),
    transition('right => center', slideTo('right') ),
    transition('left => right', slideTo('left') ),
    transition('left => center', slideTo('left') ),
    transition('center => right', slideTo('left') ),
    transition('center => left', slideTo('right') )
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    style({ height: '100vh' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-120%', opacity: 0 })
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '120%', opacity: 0 }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%', opacity: 1 }))
      ])
    ]),
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}