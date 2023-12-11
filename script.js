// const items = document.querySelectorAll('.item');
// const container = document.querySelector('.container');
// const numberOfItems = items.length;
// const angleIncrement = (2 * Math.PI) / numberOfItems;
// const radius = 300;
// let isGalleryOpen = false;

// const centerX = container.offsetWidth / 2;
// const centerY = container.offsetHeight / 2;

// const tl= gsap.timeline();

// items.forEach((item, index)=>{
//     const img = document.createElement('img');
//     img.src = './images/img' + (index + 1) + '.jpg';
//     item.appendChild(img);

//     const angle = index * angleIncrement;
//     const initialRotation = (angle * 180 / Math.PI) - 90;
//     const x = centerX + radius * Math.cos(angle);
//     const y = centerY + radius * Math.sin(angle);

//     gsap.set(item, {scale: 0});

//     tl.to(item, {
//         left: x + 'px',
//         top: y + 'px',
//         rotation: initialRotation,
//         scale: 1,
//         duration: 1,
//         ease: 'power2.out',
//         delay: 1,
//     }, index * 0.1);

//     item.addEventListener('click', function(){
//         if(!isGalleryOpen){
//             isGalleryOpen = true;

//             const duplicate = item.cloneNode(true);
//             duplicate.style.position = 'absolute';
//             container.appendChild(duplicate);

//             gsap.to(Array.from(items).filter(i => i !=item), {
//                 scale: 0,
//                 duration: 0.5,
//                 ease: 'power2.in',
//                 stagger: 0.05,
//             });

//             const endRotation = initialRotation > 180 ? initialRotation -360 : initialRotation;

//             gsap.to([item, duplicate], {
//                 rotation: endRotation,
//                 duration: 0.0001,
//                 onComplete: function(){
//                     gsap.to([item, duplicate], {
//                         left: '50%',
//                         top: '50%',
//                         transform: 'translate(-50%, -50%) scale(5)',
//                         duration: 1,
//                         ease: 'power2.out',
//                         delay: 1.25,
//                     });
//                 }
//             });


//             const closeGallery = function(){
//                 if(isGalleryOpen){
//                     gsap.to([item, duplicate],{
//                         left: x + 'px',
//                         top: y + 'px',
//                         scale: 1,
//                         rotation: initialRotation,
//                         duration: 1,
//                         ease: 'power2.out',

//                         onComplete: function(){
//                             duplicate.remove();
//                             gsap.to(items, {
//                                 scale: 1,
//                                 duration: 1,
//                                 stagger: 0.05,
//                                 ease: 'power2.out',
//                             });

//                             isGalleryOpen = false;
//                         }
//                     });
//                 }
//             };

//             item.addEventListener('click', closeGallery);
//             duplicate.addEventListener('click', closeGallery);
//         }
//     })
// })

const items = document.querySelectorAll('.item');
const container = document.querySelector('.container');
const numberOfItems = items.length;
const angleIncrement = (2 * Math.PI) / numberOfItems;
let isGalleryOpen = false;

const tl = gsap.timeline();

function updateRadius() {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Calculate radius based on the smaller dimension of the container
    return Math.min(containerWidth, containerHeight) * 0.4; // Adjust the factor as needed
}

items.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = './images/img' + (index + 1) + '.jpg';
    item.appendChild(img);

    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    const radius = updateRadius(); // Update radius for each iteration

    const angle = index * angleIncrement;
    const initialRotation = (angle * 180 / Math.PI) - 90;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    gsap.set(item, { scale: 0 });

    tl.to(item, {
        left: x + 'px',
        top: y + 'px',
        rotation: initialRotation,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 1,
    }, index * 0.1);

    item.addEventListener('click', function() {
        if (!isGalleryOpen) {
            isGalleryOpen = true;

            const duplicate = item.cloneNode(true);
            duplicate.style.position = 'absolute';
            container.appendChild(duplicate);

            gsap.to(Array.from(items).filter(i => i != item), {
                scale: 0,
                duration: 0.5,
                ease: 'power2.in',
                stagger: 0.05,
            });

            const endRotation = initialRotation > 180 ? initialRotation - 360 : initialRotation;

            gsap.to([item, duplicate], {
                rotation: endRotation,
                duration: 0.0001,
                onComplete: function() {
                    gsap.to([item, duplicate], {
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%) scale(5)',
                        duration: 1,
                        ease: 'power2.out',
                        delay: 1.25,
                    });
                }
            });

            const closeGallery = function() {
                if (isGalleryOpen) {
                    gsap.to([item, duplicate], {
                        left: x + 'px',
                        top: y + 'px',
                        scale: 1,
                        rotation: initialRotation,
                        duration: 1,
                        ease: 'power2.out',

                        onComplete: function() {
                            duplicate.remove();
                            gsap.to(items, {
                                scale: 1,
                                duration: 1,
                                stagger: 0.05,
                                ease: 'power2.out',
                            });

                            isGalleryOpen = false;
                        }
                    });
                }
            };

            item.addEventListener('click', closeGallery);
            duplicate.addEventListener('click', closeGallery);
        }
    });
});

// Listen for window resize to update the radius dynamically
window.addEventListener('resize', function() {
    items.forEach((item, index) => {
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        const radius = updateRadius(); // Update radius on resize

        const angle = index * angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        gsap.to(item, {
            left: x + 'px',
            top: y + 'px',
            duration: 0.5,
            ease: 'power2.out',
        });
    });
});



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


