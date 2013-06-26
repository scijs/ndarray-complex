ndarray-complex
===============
Complex arithmetic operations for [ndarrays](https://github.com/mikolalysenko/ndarray).


## Example

```javascript
var ndarray = require("zeros")
var cops = require("ndarray-complex")

//Generate some arrays
var a_r = zeros([10, 10])
  , a_i = zeros([10, 10])
  , b_r = zeros([10, 10])
  , b_i = zeros([10, 10])
  , c_r = zeros([10, 10])
  , c_i = zeros([10, 10])
  
//  ... do stuff ...

//Multiply a and b, storing result in c:
cops.mul(c_r, c_i, a_r, a_i, b_r, b_i)
```

## Install

    npm install ndarray-complex
    
# API

The API follows the same conventions as [ndarray-ops](https://github.com/mikolalysenko/ndarray-ops).  The following methods are exposed:

* add[s,eq,seq] - Addition
* sub[s,eq,seq] - Subtraction
* neg[eq] - Negation
* mul[s,eq,seq] - Multiplication
* div[s,eq,seq] - Division
* recip[eq] - Reciprocal
* conj[eq] - Complex conjugate
* exp[eq] - Complex exponent
* mag - Complex magnitude (squared length)
* abs - Complex length
* arg - Complex argument

# Credits
(c) 2013 Mikola Lysenko. MIT License