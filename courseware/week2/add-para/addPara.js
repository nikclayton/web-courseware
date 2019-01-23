function addPara() {
  let p = document.createElement('p');
  let txt = document.createTextNode('A new para.');
  p.appendChild(txt);
  let b = document.getElementById('the-body');
  b.appendChild(p);
}

document.addEventListener('DOMContentLoaded', function(event) {
  let p = document.getElementById('clicker');
  p.addEventListener('click', function (event) {
    addPara();
  });
});