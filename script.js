// ---------- Mobile navigation ----------
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Elevator pitch video modal ----------
const videoModal = document.querySelector('#elevator-video-modal');
const openVideoButton = document.querySelector('#open-elevator-video');
const elevatorVideo = document.querySelector('#elevator-video');
const closeVideoButtons = document.querySelectorAll('[data-close-video]');

function openVideoModal() {
  if (!videoModal) return;

  videoModal.classList.add('is-open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('video-modal-open');

  if (elevatorVideo) {
    elevatorVideo.currentTime = 0;
    const playAttempt = elevatorVideo.play();

    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        // Playback may require the user to press Play.
      });
    }
  }
}

function closeVideoModal() {
  if (!videoModal) return;

  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('video-modal-open');

  if (elevatorVideo) {
    elevatorVideo.pause();
    elevatorVideo.currentTime = 0;
  }
}

if (videoModal) {
  // Ensure the modal starts hidden when the page loads.
  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
}

if (openVideoButton) {
  openVideoButton.addEventListener('click', openVideoModal);
}

closeVideoButtons.forEach((button) => {
  button.addEventListener('click', closeVideoModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal?.classList.contains('is-open')) {
    closeVideoModal();
  }
});
