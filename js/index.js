document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.image-wrapper');
  const container = document.querySelector('.imagesec');
  const nextBtn = document.getElementById('next');
  const backBtn = document.getElementById('back');
  let current = 0;
  let autoScrollInterval;
  let direction = 1; // 1 for forward, -1 for backward

  if (!wrappers.length || !container || !nextBtn || !backBtn) {
    console.warn("Missing required DOM elements: check '.image-wrapper', '.imagesec', '#next', or '#back'");
    return;
  }

  const scrollToImage = (index) => {
    const target = wrappers[index];
    if (target) {
      const left = target.offsetLeft;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const goToImage = (step) => {
    current += step;
    if (current >= wrappers.length) {
      current = wrappers.length - 1;
      direction = -1;
    } else if (current < 0) {
      current = 0;
      direction = 1;
    }
    scrollToImage(current);
  };

  const goToNextImage = () => goToImage(1);
  const goToPrevImage = () => goToImage(-1);

  nextBtn.addEventListener('click', () => {
    direction = 1;
    goToNextImage();
    resetAutoScroll();
  });

  backBtn.addEventListener('click', () => {
    direction = -1;
    goToPrevImage();
    resetAutoScroll();
  });

  container.addEventListener('scroll', () => {
    const containerLeft = container.getBoundingClientRect().left;
    let closestIndex = current;
    let minDistance = Infinity;

    wrappers.forEach((wrapper, index) => {
      const distance = Math.abs(wrapper.getBoundingClientRect().left - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    current = closestIndex;
  });

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      goToImage(direction);
    }, 5000);
  };

  const resetAutoScroll = () => {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoScrollInterval);
    } else {
      startAutoScroll();
    }
  });

  window.addEventListener('beforeunload', () => {
    clearInterval(autoScrollInterval);
  });

  scrollToImage(current);
  startAutoScroll();
});



