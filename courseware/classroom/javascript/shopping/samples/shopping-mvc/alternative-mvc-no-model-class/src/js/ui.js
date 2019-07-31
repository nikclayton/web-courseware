/**
 * Create the controller to run the application.
 */
function domContentLoaded() {
  new FatController();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function (event) {
    domContentLoaded();
  });
} else {
  domContentLoaded();
}