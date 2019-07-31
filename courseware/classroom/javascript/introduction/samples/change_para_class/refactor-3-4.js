function setClass(event, className) {
  let el = document.getElementById('mypara');
  el.className = className;
}

document.addEventListener("DOMContentLoaded", function(event) {
  let makeWarning = document.getElementById('make-warning');
  makeWarning.addEventListener('click', function(event) {
    setClass(event, 'warning');
  });

  let makeTip = document.getElementById('make-tip');
  makeTip.addEventListener('click', function(event) {
    setClass(event, 'tip');
  });

  let makeNormal = document.getElementById('make-normal');
  makeNormal.addEventListener('click', function(event) {
    setClass(event, '');
  });
});
