function addItemToList(itemName) {
  document.querySelector('ul').appendChild(createNewListItem(itemName));
}

function createNewListItem(itemName) {
  let listItem = document.createElement('li');

  let listText = document.createElement('span');
  listText.textContent = itemName;

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', function(event) {
    listItem.parentElement.removeChild(listItem);
  });

  listItem.appendChild(listText);
  listItem.appendChild(deleteButton);

  return listItem;
}

document.addEventListener("DOMContentLoaded", function(event) {
  let inputBox = document.querySelector('input');
  document.querySelector('button').addEventListener('click', function(event) {
    addItemToList(inputBox.value);
    inputBox.value = '';
    inputBox.focus();
  });
  inputBox.focus();
});
