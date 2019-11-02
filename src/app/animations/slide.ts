import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slide =
  trigger('routeAnimation', [

    transition('portfolio => contact', slideTo('right') ),
    transition('portfolio => main', slideTo('right') ),
    transition('portfolio => project', slideTo('bottom') ),

    transition('contact => portfolio', slideTo('left') ),
    transition('contact => main', slideTo('left') ),

    transition('main => portfolio', slideTo('left') ),
    transition('main => contact', slideTo('right') ),
    transition('main => about', slideTo('top') ),
    transition('main => project', slideTo('left') ),

    transition('about => contact', slideTo('right') ),
    transition('about => portfolio', slideTo('left') ),
    transition('about => main', slideTo('bottom') ),

    transition('project => portfolio', slideTo('top') ),
    transition('project => main', slideTo('right') ),
    transition('project => contact', slideTo('right') )

  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    style({ height: '100vh' }),
    query(':enter, :leave', [
      style({
        height: '100vh',
        position: 'absolute',
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-120%', opacity: 0 })
    ], optional),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '120%', opacity: 0 }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%', opacity: 1 }))
      ], optional)
    ]),
    query(':leave', animateChild(), optional),
    query(':enter', animateChild(), optional),
  ];
}