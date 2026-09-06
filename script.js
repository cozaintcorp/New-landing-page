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
    var NEAR_END = 0.5;

    function isNearEnd() {
      return mainVideo.duration && mainVideo.currentTime >= mainVideo.duration - NEAR_END;
    }

    // Single source of truth: look at the video's actual state right now
    // and make the button match it. Called from every relevant event
    // instead of each event trying to independently track state.
    function syncButton() {
      if (mainVideo.paused && isNearEnd()) {
        playBig.textContent = '↻';
        playBig.classList.remove('is-playing');
      } else if (mainVideo.paused) {
        playBig.textContent = '▶';
        playBig.classList.remove('is-playing');
      } else {
        playBig.textContent = '▶';
        playBig.classList.add('is-playing');
      }
    }

   playBig.addEventListener('click', function () {
      if (mainVideo.paused) {
       if (isNearEnd()) {
          mainVideo.pause();
          var playWhenReady = function () {
            if (mainVideo.readyState >= 2) {
              mainVideo.removeEventListener('canplay', playWhenReady);
              mainVideo.removeEventListener('loadeddata', playWhenReady);
              mainVideo.play();
            }
          };
          mainVideo.addEventListener('canplay', playWhenReady);
          mainVideo.addEventListener('loadeddata', playWhenReady);
          mainVideo.currentTime = 0;
          mainVideo.load();
        } else {
          mainVideo.play();
        }
      } else {
        mainVideo.pause();
      }
    });

    // Force a pause once we're basically at the end, since this file's
    // 'ended' event is unreliable in some browsers.
    mainVideo.addEventListener('timeupdate', function () {
      if (isNearEnd() && !mainVideo.paused) {
        mainVideo.pause();
      }
      syncButton();
    });

    mainVideo.addEventListener('play', syncButton);
    mainVideo.addEventListener('pause', syncButton);
    mainVideo.addEventListener('ended', syncButton);

    muteBtn.addEventListener('click', function () {
      mainVideo.muted = !mainVideo.muted;
      muteBtn.textContent = mainVideo.muted ? '🔇' : '🔊';
    });
  }
});
