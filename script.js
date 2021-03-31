'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());

  // console.log(window.pageXOffset, window.pageYOffset);
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height / width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling

  // window.scrollTo(
  //   // posicion actual mas scroll actual
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   // posicion actual mas scroll actual
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navegation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

//     // console.log(id);
//   });
// });

// Event Delegation

// 1. Add event lister to the common parent element

// 2. Determine what element originate  the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  // console.log(e.currentTarget);
  // Matching es para inorar click que son fuera de la funcion
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content ');

tabsContainer.addEventListener('click', function (e) {
  //const clicked = e.target.parentElement;
  const clicked = e.target.closest('.operations__tab ');
  // console.log(clicked);

  // Guard clause para que no se devuelva el error cuando se hace click fuera del contenedor
  // el codigo despues de la funcion no se va a ejecutar

  if (!clicked) return;

  // if (clicked) {
  // clicked.classList.add('operations__tab--active');
  // }

  // Remove Active classe , a todos los elementos

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab , se le agrega la clase al elemento que se le dio click
  clicked.classList.add('operations__tab--active');

  // Activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

// sin retructurar

// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     // console.log('lin', link);
//     // console.log(siblings);
//     siblings.forEach(el => {
//       // si el es diferente a link le agrega una opacida a todos los diferente , devuelve los link difernete
//       if (el !== link) el.style.opacity = 0.5;

//       // if (el !== link) console.log(el);
//       // console.log('el', el);
//     });

//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     // console.log('lin', link);
//     // console.log(siblings);
//     siblings.forEach(el => {
//       // si el es diferente a link le agrega una opacida a todos los diferente , devuelve los link difernete
//       if (el !== link) el.style.opacity = 1;

//       // if (el !== link) console.log(el);
//       // console.log('el', el);
//     });

//     logo.style.opacity = 1;
//   }
// });

// retructurado

const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // console.log('lin', link);
    // console.log(siblings);
    siblings.forEach(el => {
      // si el es diferente a link le agrega una opacida a todos los diferente , devuelve los link difernete
      if (el !== link) el.style.opacity = this;
      // if (el !== link) el.style.opacity = opacity;

      // if (el !== link) console.log(el);
      // console.log('el', el);
    });

    logo.style.opacity = this;
    // logo.style.opacity = opacity;
  }
};

// passing Argument to Handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// llamando la funcion con otra funcion
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Sticky navigation

// const initialCoords = section1.getBoundingClientRect();

// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/////////////////////////////////////////////////
//////  new IntersectionObserver
/////////////////////////////////////////////////

// const obsCallback = function (entries, observer) {
//   // Cada entry describe un cambio en la intersección para
//   // un elemento observado
//   //   entry.boundingClientRect
//   //   entry.intersectionRatio
//   //   entry.intersectionRect
//   //   entry.isIntersecting
//   //   entry.rootBounds
//   //   entry.target
//   //   entry.time
//   // console.log(observer);
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,

//   //threshold El valor por defecto es 0 (lo que significa que tan pronto como un píxel sea visible,
//   //  la función callback será ejecutada).

//   // threshold Un valor de 1 significa que el umbral no se considera pasado hasta que todos los pixels son visibles.
//   // threshold: [0, 0.2],
//   // threshold: 0,

//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

// para tomar la altura dinamica del nav
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  // const [entry] = entries[0];
  const [entry] = entries;

  // console.log(entry);
  // console.log(!entry.isIntersecting);

  // aqui entry.isIntersecting se combierte a falso por tal razon pasa el else y remueve la clase

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

  // aqui entry.isIntersecting es = a verdadero y se quita la clase

  // if (!entry.isIntersecting) nav.classList.remove('sticky');
  // else nav.classList.add('sticky');

  //threshold El valor por defecto es 0 (lo que significa que tan pronto como un píxel sea visible,
  // la función callback será ejecutada)
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: '-90px',
});

headerObserver.observe(header);

// Reveal sections

const allSections = document.querySelectorAll('.section');
// console.log(allSections);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // entry es falso al inicial , si no esta intersection entoces devuelve return
  // cuando la sentecia esta falso agrega la clase

  // console.log(!entry.isIntersecting);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading imagenes

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // esto es para que no corra la funcion de una vez

  if (!entry.isIntersecting) return;

  // Replace src data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.3) translateX(-1200px)';
// slider.style.overflow = 'visible';

// returando

const createDots = function () {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      ` <button class="dots__dot " data-slide="${index}"></button> `
    );
  });
};

createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot ')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add('dots__dot--active');

  // console.log(document.querySelector(`.dots__dot[data-slide='${slide}']`));
};

// se le pasa el 0 para que el primer slide este con la clase active
activateDot(0);

const goToSlide = function (slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
    //curSlide = 0  100% , 0% , 100% , 300%
    // console.log(slide);
    // console.log(`${index - slide}`);
    // console.log(`${100 * (index - slide)}%`);
  });
};
// Agrega el transform
goToSlide(0);

// Next slide

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
    //curSlide = 1  -100% , 0% , 100% , 300%
  }

  // console.log(curSlide);
  goToSlide(curSlide);

  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  // console.log(curSlide);
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  // console.log(e);

  // if (e.key === 'ArrowLeft') {
  //   prevSlide();
  // } else {
  //   nextSlide();
  // }

  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();

  // e.key === 'ArrowRight ' && nextSlide();
});

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    // const slide = e.target.dataset.slide;
    const { slide } = e.target.dataset;

    // console.log(slide);

    goToSlide(slide);

    activateDot(slide);
  }
});

/////////////////////////////////////////////////
//////  Lifecycle DOM Events
/////////////////////////////////////////////////
window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  event.returnValue = '';
});

// window.addEventListener('beforeunload', function (e) {
//   var confirmationMessage = 'o/';

//   e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
//   return confirmationMessage; // Gecko, WebKit, Chrome <34
// });

/*

// slides.forEach((s, index) => {
//   // console.log(index);
//   // console.log(`${100 * index}%`);

//   // s.style.transform = `translateX(${100 * index}%)`;
//   // 0% , 100% , 200% , 300%

//   s.style.transform = `translateX(${100 * (index - curSlide)}%)`;

//   console.log(`${100 * (index - curSlide)}%`);
// });

slides.forEach((s, index) => {
  // agregando el transform a cada elemento
  s.style.transform = `translateX(${100 * index}%)`;
  // 0% , 100% , 200% , 300%
  // console.log(index);
  // console.log(`${100 * index}%`);
});

// Next slide

// console.log(slides);
// console.log(maxSlide - 1);

btnRight.addEventListener('click', () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slides.forEach((s, index) => {
    // console.log(index);
    // console.log(`${100 * (index - curSlide)}%)`);
    s.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    //curSlide = 1  -100% , 0% , 100% , 300%
  });
});





/////////////////////////////////////////////////
//////  DOM Traversing
/////////////////////////////////////////////////

const h1 = document.querySelector('h1');

// Going downwards: child

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

// Going upwards: parents

console.log(h1.parentNode);
console.log(h1.parentElement);
// El closest()método busca en el árbol DOM el elemento más cercano que coincida con un selector CSS especificado.
// Comienza en el elemento en sí, luego prueba el padre, el abuelo, etc. hasta que se encuentra una coincidencia.
// Si no se encuentra una coincidencia, este método devuelve un valor null .
h1.closest('.header').style.background = `var(--gradient-secondary)`;
h1.closest('h1').style.background = `var( --gradient-primary)`;

// Goind sideways: Sinblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

/////////////////////////////////////////////////
//////  Event Propagation in Practice
/////////////////////////////////////////////////




/////////////////////////////////////////////////
//////  Selecionando Elemento del DOM
/////////////////////////////////////////////////

// Selecional todo el documento
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');

// Devuelve a nodeList no se autoaliza automaticamente
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

// Devuelve a HTMLCollection si se cambia algo del DOM se autializa automaticamanete
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// Devuelve a HTMLCollection si se cambia algo del DOM se autializa automaticamanete

console.log(document.getElementsByClassName('btn'));

/////////////////////////////////////////////////
//////  Creating and inserting elements
/////////////////////////////////////////////////

// insertAdjacentHTML

const Html = ` <p> HOLA </p>
`;
// header.insertAdjacentHTML('afterbegin', Html);

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';

message.innerHTML =
  'We use cookied for improved functionality and analytics.<button class="btn btn-close-cookie"> Got it ! </button>';

// agrega el elemento como primer hijo
// header.prepend(message);

// agrega el elemento como el ultimo hijo
header.append(message);

// hacerle una copia del elemento con cloneNode
// header.append(message.cloneNode(true));

header.before(message);
// header.after(message);

/////////////////////////////////////////////////
//////  Delete elements
/////////////////////////////////////////////////

document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    message.remove();

    // como se hacia antes

    message.parentElement.removeChild(message);
  });

/////////////////////////////////////////////////
//////  Styles , Attributes and Classes
/////////////////////////////////////////////////

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// para recibir elemento

console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message));

// para tomar un elemento en especifico
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 5 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes

const logo = document.querySelector('.nav__logo');

console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beutifull minimalist logo';

// Non-standard

console.log(logo.designer);
console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');

// logo.src devuelve la direcion completa
console.log(logo.src);

// logo.getAttribute('src') devuelve la direcion completa como esta en el HTML
console.log(logo.getAttribute('src'));

// data attributes hay que convertirlo el nombre a camelCase

// Los atributos data-*  permiten almacenar información adicional sobre un elemento
// HTML cualquiera sin tener que recurrir a artilugios tales como la utilización de atributos no estándar
// Un atributo cualquiera cuyo nombre comience con data-es un atributo de datos.
//  Supongamos que tenemos un artículo y deseamos almacenar información adicional
//  que no tiene ninguna representación visual. En ese caso, alcanza con que hagamos uso de los atributos data

// Leer los valores de estos atributos en JavaScript también es muy sencillo.
// Puede usar getAttribute() con su nombre HTML completo para leerlos,
// pero el estándar define una forma más simple: un DOMStringMap puede leer a través de una propiedad dataset.

console.log(logo.dataset.versionNumber);
console.log(logo.getAttribute('data-version-number'));

// Classes

// Usar classList es una forma práctica de acceder a la lista de clases de un elemento

logo.classList.add('c');
logo.classList.remove('c');

// toggle si la clase existe la elimina y devuelve false, si no, la añade y devuelve true.
logo.classList.toggle('c');

// contains Comprueba si la clase indicada existe en el atributo de clase del elemento.
logo.classList.contains('c');

// replace( oldClass, newClass ) Reemplaza una clase existente por una nueva.
logo.classList.replace('c', 'a');

//item( Number )  Devuelve el valor de la clase por índice en la colección.
logo.classList.item(5);


*/
