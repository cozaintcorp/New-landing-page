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
});
