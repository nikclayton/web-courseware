function addPara() {
  let p = document.createElement('p');
  let txt = document.createTextNode('A new para.');
  p.appendChild(txt);
  let b = document.getElementById('the-body');
  b.appendChild(p);
}