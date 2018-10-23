function setClass(className) {
  document.getElementById('mypara').className = className;
}

document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('make-warning').addEventListener('click', function(event) {
    setClass('warning');
  });

  document.getElementById('make-tip').addEventListener('click', function(event) {
    setClass('tip');
  });

  document.getElementById('make-normal').addEventListener('click', function(event) {
    setClass('');
  });
});
