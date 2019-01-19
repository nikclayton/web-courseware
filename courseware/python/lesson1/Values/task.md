# Values

Python has values, just like Javascript.

## Numbers

Numbers in Python are written the same as numbers in Javascript.
For example:

```python
10
12.5
0
```

## Strings

### Single quotes

We generally use single quotes for strings in Python, just like
Javascript.

```python
'This is a string.'
```

Just like Javascript, the empty string is written with two singlequotes.

```python
''
```

### Triple-quotes

Whenever we have a string that we want to go over several lines we can
write it inside triple-quotes. That is, the double quote character (`"`)
three times. For example:

```python
"""This is a long string that contains several lines
like this. Notice how it starts and ends with triple-quotes."""
```

### Back-ticks

In Javascript we can include a value inside a string by using backticks,
and the `${...}` syntax. For example:

```javascript
`This string contains a variable: ${x}`
```

Python doesn't support this directly, but it does include a more powerful
mechanism for creating strings with values from variables, which we will
cover later.

### Null values

We have the idea of a special value used to indicate that a value is
missing.

In Javascript we write this as `null`.  Python has the same idea, but
calls it `None` instead.

> **Important:** The capital letters are important, it's `None`, not `none`,
`NONE`, or other variants.

### Undefined values

In Javascript there is another special value indicating that a variable
has not yet been defined. Javascript calls this `undefined`.

Python does not do this. A variable that has not been given a value has
the value `None` instead.