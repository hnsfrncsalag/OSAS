let currentIndex = 0;
const slider = document.getElementById('slider');
const slides = slider.children;
const totalSlides = slides.length;

// Clone first slide for seamless loop
const firstClone = slides[0].cloneNode(true);
slider.appendChild(firstClone);

const dotsContainer = document.getElementById('dots');
let dots = [];

/* CREATE DOTS (exclude clone) */
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
  dots.push(dot);
}

function updateSlider(animate = true) {
  slider.style.transition = animate ? 'transform 1.2s ease-in-out' : 'none';
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex % totalSlides);
  });
}

function nextSlide() {
  currentIndex++;
  updateSlider();

  // If we're at cloned slide, jump back smoothly
  if (currentIndex === totalSlides) {
    setTimeout(() => {
      currentIndex = 0;
      updateSlider(false);
    }, 1200); // match transition duration
  }
}

function prevSlide() {
  if (currentIndex === 0) {
    currentIndex = totalSlides;
    updateSlider(false);
  }

  setTimeout(() => {
    currentIndex--;
    updateSlider();
  }, 20);
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

/* AUTO ROTATE */
setInterval(nextSlide, 4000);
