function setClass(event, className) {
  let el = document.getElementById('mypara');
  el.className = className;
}

document.addEventListener('DOMContentLoaded', function(event) {
  let makeWarning = document.getElementById('make-warning');
  makeWarning.addEventListener('click', function(event) {
    setClass(event, 'warning');
  });
});
