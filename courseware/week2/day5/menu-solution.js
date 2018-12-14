function hideMenu() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('hide-menu').style.display = 'none';
  document.getElementById('show-menu').style.display = '';

}

function showMenu() {
  document.getElementById('menu').style.display = '';
  document.getElementById('show-menu').style.display = 'none';
  document.getElementById('hide-menu').style.display = '';
}

document.addEventListener('DOMContentLoaded', function(event) {
  document.getElementById('show-menu').addEventListener('click', showMenu);
  document.getElementById('hide-menu').addEventListener('click', hideMenu);
});