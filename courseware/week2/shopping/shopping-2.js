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

  listItem.appendChild(listText);
  listItem.appendChild(deleteButton);

  return listItem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  document.querySelector('button').addEventListener('click', function (event) {
    let inputBox = document.getElementById('item');
    console.log(inputBox.value);

    // Call createNewListItem with the contents of the input widget and save
    // the result in a variable.

    // Use document.querySelector to find the ul element and save the result
    // in a variable.

    // Append the li element returned by createNewListItem to the ul element
    // returned by document.querySelector.
  });
});

function elseTest(num) {
  if (num < 10) {
    console.log('less than 10');
  } else if (num > 10) {
    console.log('bigger than 10');
  } else if (num === 10) {
    console.log('exactly 10');
  }
}

function elseTest2(num) {
  if (num < 10) {
    console.log('less than 10');
  } else if (num > 10) {
    console.log('bigger than 10');
  } else {
    console.log('exactly 10');
  }
}

function elseTest3(num) {
  if (num > 10) {
    console.log('bigger than 10');
  } else if (num < 10) {
    console.log('less than 10');
  } else {
    console.log('exactly 10');
  }
}

function elseTest4(num) {
  if (num > 10) {
    console.log('bigger than 10');
  } else if (num === 10) {
    console.log('exactly 10');
  } else {
    console.log('less than 10');
  }
}


function elseTest5(num) {
  if (typeof (num) === 'number') {
    if (num > 10) {
      console.log('bigger than 10');
    } else if (num === 10) {
      console.log('exactly 10');
    } else {
      console.log('less than 10');
    }
  } else {
    console.log('numbers only please');
  }
}

function elseTest6(num) {
  if (typeof(num) !== 'number') {
    console.log('numbers only please');
    return;
  }

  if (num > 10) {
    console.log('bigger than 10');
    return;
  }

  if (num < 10) {
    console.log('less than 10');
    return;
  }

  console.log('exactly 10');
}