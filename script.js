'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
  const tabs = document.querySelectorAll('.operations__tab');
  const tabsContainer = document.querySelector('.operations__tab-container');
  const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav'); 
const navHeight = nav.getBoundingClientRect().height;

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////
/////////////////////////////////////

// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.append(message);




// // Delete cookie message
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove();
// });

// // Styles 
// message.style.backgroundColor = '#37383d';
// message.style.width = '20%';
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';




//* Learn more button scroll
 
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();

section1.scrollIntoView({ behavior: 'smooth' });
});
//////////////////////////////


//! Smooth scrolling Works only after turning on animation effects on windows
// *For Windows 11 Settings > Accessibility > Visual Effects

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    })
  });

  //*Tabbed component


  tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabContent.forEach(c => c.classList.remove('operations__content--active'));
    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  });

//* Nav bar
function handleHover(e, opacity)
{
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', (e) => handleHover(e, 0.5));
nav.addEventListener('mouseout', (e) => handleHover(e, 1));

// //Sticky Navigation
// window.addEventListener('scroll', function(){
//   if (window.scrollY > section1.getBoundingClientRect().top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       nav.classList.add('sticky');
//     } else {
//       nav.classList.remove('sticky');
//     }
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.01,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// * Sticky Navigation using Intersection Observer API

const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};



const headerObserver = new IntersectionObserver(stickyNav , {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

// * Revealing elements on scroll

const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  });
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
  rootMargin: '-100px'
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
});

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function () {
//   alert('Heading hovered!');
// });

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__link').addEventListener('click', function (e) {
 
//  console.log('Link clicked!');
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
  
//  console.log('Link clicked!');
// });

//* Lazy loading images 
const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// *Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
// slider.style.transform = 'scale(0.2) translateX(-800px)';
// slider.style.overflow = 'visible';

let currentSlide = 0;
const maxSlide = slides.length;

function createDots() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

createDots();
activateDot(0);

function activateDot(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

function goToSlide(slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};

goToSlide(0);

function nextSlide()  {
if (currentSlide === maxSlide - 1) {
  currentSlide = 0;
} else {
  currentSlide++;
}

goToSlide(currentSlide);
activateDot(currentSlide);
  
};

function prevSlide() {
if (currentSlide === 0) {
  currentSlide = maxSlide - 1;
} else {
  currentSlide--;
}


goToSlide(currentSlide);
activateDot(currentSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});
dotContainer.addEventListener('click', function(e) {
  const {slide} = e.target.dataset;
  if (e.target.classList.contains('dots__dot')) {
    goToSlide(slide);
    activateDot(slide);
  }

});
