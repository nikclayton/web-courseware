// Use this to demo building up a solution.

// Step 1, make sure loading the JS has worked correctly. If
// no message is logged then check the HTML.

console.log('Everything works?');

// This function shows various ways of writing this. The
// recommended approach is to sketch out the function with
// just comments first (all the comments that start TODO).
//
// Then write the code that implements what the comments asks
// for.
//
// The commented code is one way of doing it, using lots of
// of variables and spelling out the steps explicitly. The
// uncommented code shows how to use functions to do this,
// and the functions show various different ways of changing
// the DOM.

function createList() {
  // TODO: Create the ul
  let ul  = document.createElement('ul');

  // Create the li variable.
//  let li;

  // TODO: Create and append the first list item
  //  li = document.createElement('li');
  //  let li1Content = document.createTextNode('First item');
  //  li.appendChild(li1Content);
  // ul.appendChild(li);

  ul.appendChild(createLiWithText('First item'));

  // TODO: Create and append the second list item
//  li = document.createElement('li');
//  let li2Content1 = document.createTextNode('This is ');
//  let li2Em = document.createElement('em');
//  let li2EmContent = document.createTextNode('emphasised');
//  li2Em.appendChild(li2EmContent);
//  let li2Content2 = document.createTextNode(' text.');
//  li.appendChild(li2Content1);
//  li.appendChild(li2Em);
//  li.appendChild(li2Content2);
//  ul.appendChild(li);

  ul.appendChild(createLiWithHTMLTheEasyWay('This is <em>emphasised</em> text.'));

  // TODO: Create and append the third list item
  //li = createLiWithText('Third item');
  //ul.appendChild(li);

  ul.appendChild(createLiWithTextTheEasyWay('Third item'));

  // TODO: Append the list to the body
  // -- First, get the body element
  // -- Then append the list element

//  let body = document.getElementById('the-body');
//  body.appendChild(ul);
  document.getElementById('the-body').appendChild(ul);
}

function createLiWithText(textContent) {
  let li = document.createElement('li');
  let content = document.createTextNode(textContent);
  li.appendChild(content);
  return li;
}

function createLiWithTextTheEasyWay(textContent) {
  let li = document.createElement('li');
  li.innerText = textContent;
  return li;
}

function createLiWithHTMLTheEasyWay(htmlContent) {
  let li = document.createElement('li');
  li.innerHTML = htmlContent;
  return li;
}

document.addEventListener('DOMContentLoaded', function(event) {
  let clicker = document.getElementById('clicker');
  clicker.addEventListener('click', function(event) {
    createList();
  });
});