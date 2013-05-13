"use strict"

var cops = require("../cops.js")
var ndarray = require("ndarray")
var ops = require("ndarray-ops")

require("tap").test("ndarray-complex", function(t) {


  var a_r = ndarray.zeros([3])
    , a_i = ndarray.zeros([3])
    , b_r = ndarray.zeros([3])
    , b_i = ndarray.zeros([3])
    , c_r = ndarray.zeros([3])
    , c_i = ndarray.zeros([3])
    
  a_r.set(0, 1)
  a_i.set(1, 1)
  a_r.set(2, 2)
  a_i.set(2, -1)
  
  b_r.set(0, 1)
  b_r.set(1, 1)
  b_i.set(2, 1)
  
  cops.mul(c_r, c_i, a_r, a_i, b_r, b_i)
  t.equals(c_r.toString(), "[1,0,1]")
  t.equals(c_i.toString(), "[0,1,2]")

  var tab = ndarray.zeros([3], "uint8")
  cops.muleq(a_r, a_i, b_r, b_i)
  t.assert(ops.all(ops.eq(tab, a_r, c_r)))
  t.assert(ops.all(ops.eq(tab, a_i, c_i)))
  

  t.end()
})