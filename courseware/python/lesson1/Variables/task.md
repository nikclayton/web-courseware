# Variables

Python has variables, just like Javascript.

## Javascript

In Javascript we can define variables using `let`.

When we do this we can either define the variable first, and then give it a value later, like so:

```javascript
let x;
x = 10;
```

Or we can combine the two on one line, like this.

```javascript
let x = 10;
```

To use a variable in Javascript we just write its name.

```javascript
x;  // 10
```

## Python

Python also has variables, but the syntax for defining them is different.

First, you do not use the keyword `let`. You just write the variable name,
an equals sign, and the value you want it to have.

```python
x = 10
```

This also introduces another difference from Javascript - Python **does**
**not** use semi-colons (`;`) at the end of statements. The statement ends
when the line ends.

If you want to define a variable without a value (what Javascript would
call `undefined`), you must still give the variable a value, and use the
special value `None`.

```python
x = None
```

Using a variable in Python is identical to Javascript, write the name.

```python
x  # 10
```

Again, there is no semi-colon at the end of the line.

Comments in Python are also different. In Javascript, line-comments start
`//`, in Python they start `#`.

# Constants

## Javascript

In Javascript we can declare that a variable is a constant, using the
`const` keyword, like this.

```javascript
const pi = 3.14151926;
```

Once done we can not change the value of `pi`.

## Python

Python does not have constants. You can change the value of any variable
at any time.

Instead, Python has a *convention* that a variable name written in upper
case is a constant. The equivalent Python code is:

```python
PI = 3.1415926
```

## Names

In Javascript, variables and functions with that consist of two or more
words are generally written in `lowerCamelCase`. For example:

- `listItem`
- `inputBox`
- `addItemButton`
- `getElementById`
- `createNewListItem`
- `querySelector`

In Python the convention is to use `snake_case`. For example, the same
identifiers in Python would be written as

- `list_item`
- `input_box`
- `add_item_button`
- `get_element_by_id`
- `create_new_list_item`
- `query_selector`

# Summary

| Action | Javascript | Python |
| --- | --- | --- |
| Declare variable with value | `let x = 10;` | `x = 10` |
| Declare variable, no value | `let x;` | x = None |
| Use a variable | `x;` | `x` |
| Declare a constant | `const c = 10;` | `C = 10` |
