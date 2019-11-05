import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

const slideToRight = [
  style({ height: '100vh' }),
  query(':enter, :leave', [
    style({
      height: '100vh',
      position: 'absolute',
      right: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ right: '-120%', opacity: 0 })
  ], { optional: true }),
  group([
    query(':leave', [
      animate('600ms ease', style({ right: '120%', opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease', style({ right: '0%', opacity: 1 }))
    ], { optional: true })
  ]),
  query(':leave', animateChild(), { optional: true }),
  query(':enter', animateChild(), { optional: true }),
];

const slideToLeft = [
  style({ height: '100vh' }),
  query(':enter, :leave', [
    style({
      height: '100vh',
      position: 'absolute',
      left: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ left: '-120%', opacity: 0 })
  ], { optional: true }),
  group([
    query(':leave', [
      animate('600ms ease', style({ left: '120%', opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease', style({ left: '0%', opacity: 1 }))
    ], { optional: true })
  ]),
  query(':leave', animateChild(), { optional: true }),
  query(':enter', animateChild(), { optional: true }),
];

const slideToTop = [
  style({ height: '100vh' }),
  query(':enter, :leave', [
    style({
      height: '100vh',
      position: 'absolute',
      top: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ top: '-120%', opacity: 0 })
  ], { optional: true }),
  group([
    query(':leave', [
      animate('600ms ease', style({ top: '120%', opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease', style({ top: '0%', opacity: 1 }))
    ], { optional: true })
  ]),
  query(':leave', animateChild(), { optional: true }),
  query(':enter', animateChild(), { optional: true }),
];

const slideToBottom = [
  style({ height: '100vh' }),
  query(':enter, :leave', [
    style({
      height: '100vh',
      position: 'absolute',
      bottom: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ bottom: '-120%', opacity: 0 })
  ], { optional: true }),
  group([
    query(':leave', [
      animate('600ms ease', style({ bottom: '120%', opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease', style({ bottom: '0%', opacity: 1 }))
    ], { optional: true })
  ]),
  query(':leave', animateChild(), { optional: true }),
  query(':enter', animateChild(), { optional: true }),
];

export const slide =
  trigger('routeAnimation', [

    transition('portfolio => contact', slideToRight ),
    transition('portfolio => main', slideToRight ),
    transition('portfolio => project', slideToBottom ),

    transition('contact => portfolio', slideToLeft ),
    transition('contact => main', slideToLeft ),

    transition('main => portfolio', slideToLeft ),
    transition('main => contact', slideToRight ),
    transition('main => about', slideToTop ),
    transition('main => project', slideToLeft ),

    transition('about => contact', slideToRight ),
    transition('about => portfolio', slideToLeft ),
    transition('about => main', slideToBottom ),

    transition('project => portfolio', slideToTop ),
    transition('project => main', slideToRight ),
    transition('project => contact', slideToRight )

  ]);