/**
 * Create the controller to run the application.
 */
function domContentLoaded() {
  new Controller();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function (event) {
    domContentLoaded();
  });
} else {
  domContentLoaded();
}