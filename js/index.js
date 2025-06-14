document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.image-wrapper');
  const container = document.querySelector('.imagesec');
  const nextBtn = document.getElementById('next');
  const backBtn = document.getElementById('back');
  let current = 0;
  let autoScrollInterval;

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

  const goToNextImage = () => {
    current = (current + 1) % wrappers.length;
    scrollToImage(current);
  };

  const goToPrevImage = () => {
    current = (current - 1 + wrappers.length) % wrappers.length;
    scrollToImage(current);
  };

  nextBtn.addEventListener('click', () => {
    goToNextImage();
    resetAutoScroll();
  });

  backBtn.addEventListener('click', () => {
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
    autoScrollInterval = setInterval(goToNextImage, 5000);
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
