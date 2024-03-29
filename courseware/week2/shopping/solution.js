/**
 * Creates and returns an 'li' element for inclusion in the shopping list.
 *
 * @param {string} itemName Name of the item to append to the list
 * @returns {HTMLElement} li element
 */
function createNewListItem(itemName) {
  let listItem = document.createElement('li');

  let listText = document.createElement('span');
  listText.textContent = itemName;

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', function(event) {
    listItem.remove();
  });

  listItem.appendChild(listText);
  listItem.appendChild(deleteButton);

  return listItem;
}

document.addEventListener('DOMContentLoaded', function(event) {
  let inputBox = document.getElementById('item');
  let button = document.querySelector('button');
  button.disabled = true;

  document.querySelector('button').addEventListener('click', function(event) {
    if (inputBox.value !== '') {
      document.querySelector('ul').appendChild(createNewListItem(inputBox.value));
      inputBox.value = '';
    }
    inputBox.focus();
  });

  document.querySelector('input').addEventListener('keyup', function(event) {
    button.disabled = false;
    if (event.key === 'Enter') {
      document.querySelector('ul').appendChild(createNewListItem(inputBox.value));
      inputBox.value = '';
    }
  });

  document.querySelector('input').addEventListener('input', function(event) {
    let button = document.querySelector('button');
    if (this.value === '') {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });
  inputBox.focus();
});
