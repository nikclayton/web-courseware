function setClassWarning(event) {
  let el = document.getElementById('mypara');
  el.className = 'warning';
}

function setClassTip(event) {
  let el = document.getElementById('mypara');
  el.className = 'tip';
}

function clearClass(event) {
  let el = document.getElementById('mypara');
  el.className = '';
}

function setClass(event, className) {
  let el = document.getElementById('mypara');
  el.className = className;
}
