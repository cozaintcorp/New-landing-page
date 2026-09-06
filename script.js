// MARCIA homepage — lightweight interactions
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('assessment-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var company = document.getElementById('company').value.trim();
      var button = form.querySelector('button[type="submit"]');
      var originalText = button.textContent;
      if (!company) return;
      button.textContent = 'Request sent';
      button.disabled = true;
      form.reset();
      setTimeout(function () {
        button.textContent = originalText;
        button.disabled = false;
      }, 3000);
      // NOTE: this form currently only simulates a submission.
      // Wire it up to your actual lead-capture endpoint (email service,
      // CRM webhook, etc.) before this goes live to real visitors.
    });
  }
  // Hero: big centered play button starts the narrated video.
  // Mute button toggles sound. Video shows a replay control at the end.
  var mainVideo = document.getElementById('heroVideo');
  var playBig = document.getElementById('heroPlayBig');
  var muteBtn = document.getElementById('heroMuteBtn');
  if (mainVideo && playBig && muteBtn) {
    function showReplayButton() {
      playBig.classList.remove('is-playing');
      playBig.textContent = '↻';
    }
    playBig.addEventListener('click', function () {
      if (mainVideo.paused || mainVideo.ended) {
        if (mainVideo.ended || mainVideo.currentTime >= mainVideo.duration - 0.5) {
          mainVideo.load();
          mainVideo.play();
        } else {
          mainVideo.play();
        }
      } else {
        mainVideo.pause();
      }
    });
    mainVideo.addEventListener('ended', showReplayButton);
    mainVideo.addEventListener('timeupdate', function () {
      if (mainVideo.duration && mainVideo.currentTime >= mainVideo.duration - 0.5 && !mainVideo.paused) {
        mainVideo.pause();
        showReplayButton();
      }
    });
    mainVideo.addEventListener('pause', function () {
      if (mainVideo.currentTime < mainVideo.duration - 0.5) {
        playBig.classList.remove('is-playing');
      }
    });
   mainVideo.addEventListener('play', function () {
      if (mainVideo.currentTime < mainVideo.duration - 0.5) {
        playBig.classList.add('is-playing');
        playBig.textContent = '▶';
      }
    });
    muteBtn.addEventListener('click', function () {
      mainVideo.muted = !mainVideo.muted;
      muteBtn.textContent = mainVideo.muted ? '🔇' : '🔊';
    });
  }
});
