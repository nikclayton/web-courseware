# Functions

Functions in Python serve the same role as functions in Javascript -- they
let us take a piece of functionality, give it a name, and call it from
different places.

In Javascript we define a function with the `function` keyword, give it
a name, list any parameters in parentheses, and then mark the start and
end of the function body with curly brackets.

```javascript
function greet() {
  return 'hello';
}
```

Python is similar, but with some important differences. The equivalent
Python function looks like this:

```python
def greet():
    return 'hello'
```

The simplest difference is that where Javascript uses `function`, Python
uses `def` (short for "define").

The more important difference is how Python handles blocks of code.

In Javascript, a block of code starts with an opening curly bracket, then
the code, and then a closing curly bracket.

We use spaces inside the block to indicate the structure of the code, but
they are not important in Javascript -- they help us, not the computer.

In Python we start a block with colon (`:`), not a curly bracket. And the
colon must not have a space before it.

The code then **must** be indented. By convention we use 4 spaces to do this.

There is no closing curly bracket. The function stops when the indentation
returns to normal.

This means that this:

```javascript
function greet() {
  return 'hello';
}
```

and this: 

```javascript
function green() {
return 'hello';
}
```
 
are identical in Javascript, only the indentation matters.
 
However, this:
 
 ```python
def greet():
    return 'hello'
```

and

```python
def greet():
return 'hello'
```

are **not** the same in Python. The second one is an error, because there
is no indentation.