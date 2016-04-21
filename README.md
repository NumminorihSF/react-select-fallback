react-select-fallback
============

A `select` control element for [React](http://facebook.github.io/react/index.html) with custom drop-down and with fallback.


## Installation

The easiest way to use React-Select is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

```sh
npm install react-select-fallback --save
```

## Usage

React-select-fallback use custom drop-down if it is specified.

On server rendering it will return html `select` element for capability with disabled js.

Also by default, if user use touch-device, it will use html `select` just because it is more comfortable then drop-down.
   
```javascript

var FSelect = require('react-select-fallback');

<div>
  <FSelect value={1} options={[
    { name: 'one', value: 1 },
    { name: 'two', value: 2 },
    { name: 'three', value: 3 }
  ]}>
  //some drop-down. or will use fallback if not specified
  </FSelect>
</div>

```

## Further options


	Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
className | string | `''` | css class for html `select` element. also is passed to children 
onChange  | function| `function(){}` | onChange listener 1st argument is an value of selected options
options   | object[] | `[]` | array of object with fields `'name'` (displayed name of value), `'value'`
autoFocus | boolean | `false` | html autofocus prop
disabled | boolean | `false` | html disabled prop
form | DOMElement | `undefined` | html form prop
multiple | boolean | `false` | html multiple prop
name | string | `'select'` | html name prop
required | boolean | `false` | html required prop
size | number | `1` | html size prop
tabIndex | number | `undefined` | html tabindex prop
accessKey | string | `undefined` | html accesskey prop
value | string/number or [] | `undefined` | value of select and dropdown
defaultValue | string/number or [] | `undefined` | default (or init) value of select and dropdown 


## LICENSE - "MIT License"

Copyright (c) 2016 Konstantine Petryaev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.