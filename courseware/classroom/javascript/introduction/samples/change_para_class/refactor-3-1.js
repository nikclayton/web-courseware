function setClass(event, className) {
  let el = document.getElementById('mypara');
  el.className = className;
}

let makeWarning = document.getElementById('make-warning');
makeWarning.addEventListener('click', setClass);
