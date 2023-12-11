let target = 0;
let current = 0;
let ease = 0.075;

const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');
const markerWrapper = document.querySelector('.marker-wrapper');
const activeSlide = document.querySelector('.active-slide');

let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

function lerp(start, end, factor){
    return start + (end - start) * factor;
}

function updateActiveSliderNumber(markerMove, markerMaxMove){
    const partWidth = markerMaxMove / 18;
    let currentPart = Math.round((markerMove - 70) / partWidth) + 1;
    currentPart = Math.min(18, currentPart);
    activeSlide.textContent = `${currentPart}/18`
}

function update(){
    current = lerp(current, target, ease);

    gsap.set('.slider-wrapper', {
        x: -current,
    });


    let moveRatio = current / maxScroll;

    let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
    let markerMove = 70 + moveRatio * markerMaxMove;

    gsap.set('.marker-wrapper', {
        x: markerMove,
    });

    updateActiveSliderNumber(markerMove, markerMaxMove);

    requestAnimationFrame(update);
}

window.addEventListener('resize', ()=> {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
});

window.addEventListener('wheel', (e)=>{
    target += e.deltaY;

    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
});

update();


const aboutOpen = document.querySelector('.about-open');
const aboutClose = document.querySelector('.about-close');
const aboutContainer = document.querySelector('.about-container');

function openAbout() {
  gsap.to(aboutContainer, {
    x: 0,
    duration: 1,
    ease: 'power2.out',
  });
}

function closeAbout() {
  gsap.to(aboutContainer, {
    x: '100%',
    duration: 1,
    ease: 'power2.in',
  });
}

aboutOpen.addEventListener('click', function() {
  openAbout();
});

aboutClose.addEventListener('click', function() {
  closeAbout();
});

// Ensure the 'closed' class is applied initially after the page loads
window.addEventListener('load', function() {
  aboutContainer.style.transform = 'translateX(100%)';
});












function animateOnLoad() {
  const tl = gsap.timeline();

  tl.from('.slider img', {
    x: '-100%', // Start the images off-screen to the left
    stagger: 0.1, // Stagger the animation of each image
    duration: 1.5,
    ease: 'power4.out',
  })
    .from('.marker-wrapper', {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=1.3') // Offset this animation by 1.3 seconds

}

// Animate elements on page load
window.addEventListener('load', function() {
  aboutContainer.style.transform = 'translateX(100%)';
  animateOnLoad();
});
