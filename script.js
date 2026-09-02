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

  // Hero: logo animation plays first, then crossfades into the main video.
  // Play/pause and mute controls affect whichever clip is currently showing,
  // and the main video shows a replay control once it reaches the end
  // instead of freezing on the last frame.
  var mainVideo = document.getElementById('heroVideo');
  var logoVideo = document.getElementById('heroLogo');
  var playBtn = document.getElementById('heroPlayBtn');
  var muteBtn = document.getElementById('heroMuteBtn');

  if (mainVideo && logoVideo && playBtn && muteBtn) {
    var showingLogo = true;

    function switchToMain() {
      showingLogo = false;
      logoVideo.classList.add('is-hidden');
      mainVideo.currentTime = 0;
      mainVideo.play();
      playBtn.textContent = '⏸';
    }

    logoVideo.addEventListener('ended', switchToMain);
    // Safety net: if the logo clip fails to play for any reason, still show the main video.
    logoVideo.addEventListener('error', switchToMain);

    mainVideo.addEventListener('ended', function () {
      playBtn.textContent = '↻';
    });

    playBtn.addEventListener('click', function () {
      var active = showingLogo ? logoVideo : mainVideo;
      if (active.ended || active.paused) {
        if (active.ended) { active.currentTime = 0; }
        active.play();
        playBtn.textContent = '⏸';
      } else {
        active.pause();
        playBtn.textContent = '▶';
      }
    });

    muteBtn.addEventListener('click', function () {
      var newMuted = !mainVideo.muted;
      mainVideo.muted = newMuted;
      logoVideo.muted = newMuted;
      muteBtn.textContent = newMuted ? '🔇' : '🔊';
    });
  }
});
