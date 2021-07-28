# Hello, i am [Rahul](https://ats1999.github.io/)

> Features of this editor
## Heading support
# - h1
## - h2
...
###### - h6

## Text type
**Bold**, *italic*, ***bold italic***, ~~stricked~~

## Text Color
<span style="color: red">Red</span> , <span style="color: white">White</span>, <span style="color: yellow">Yellow</span>, <span style="color: #00ff09">custom</span>

## Block Quote
> Hi, this is block quote

## Lists
### Unordered List
* a
* b
    * c
        * d
            * e
### Ordered List
1. a
2. b
    1. c
        1. d
            1. e

## Task List
* [ ] task1
* [x] task2
* [x] task3
* [ ] task4

## Table
| heading-1 | heading-2 |
| --- | --- |
| data-1 | data-2 |

## Image
![Rahul](https://res.cloudinary.com/practicaldev/image/fetch/s--nh8zSFgY--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/285604/94170c66-2590-4002-90e0-ec4dc94ed7b5.png)

## Link
[Rahul Portfolio](ats1999.github.io)

## Inline code highlighting
\`inline highlight\`

## Code Block Highlight
\`\`\`js
***language-name
// code
***
// supported language
// html,css, java, c++(cpp), python, jsx, javascript,c
\`\`\`
\`\`\`html
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
    </body>
</html>
\`\`\`
\`\`\`css
/* css */
body {
  background-color: lightblue;
}
h1 {
  color: white;
  text-align: center;
}
p {
  font-family: verdana;
  font-size: 20px;
}
\`\`\`
\`\`\`c
// c
#include <iostream>
using namespace std;
int main() {
  cout << "Hello World!";
  return 0;
}
\`\`\`
\`\`\`python
// python
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(arr)
print(type(arr))
\`\`\`
\`\`\`jsx
// jsx
<ReactChild>
  <Hi>
    <p style={{
      color:"red",
      padding:10
    }}>This is the text</p>
  </Hi>
</ReactChild>
\`\`\`
\`\`\`js
// js - javascript
function findMax() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}
\`\`\`

## Math  Typecasting
### inline math - ([katex-supported](https://katex.org/docs/supported.html))
This is mass enery relation -> $e=mc^2$
### Using [katex](https://katex.org/docs/supported.html)
$$katex
\\def\\arraystretch{1.5}
   \\begin{array}{c:c:c}
   a & b & c \\\\ \\hline
   d & e & f \\\\
   \\hdashline
   g & h & i
\\end{array}
$$
### Using [latex](https://www.overleaf.com/learn)
$$latex
\\[ x^n + y^n = z^n \\]
$$

## Charts
$$chart
,category1,category2
Jan,21,23
Feb,31,17

type: column
title: Monthly Revenue
x.title: Amount
y.title: Month
y.min: 1
y.max: 40
y.suffix: $
$$

## Mermaid
$$mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
$$

# Thanks