"use strict"

var cwise = require("cwise")
var ops = require("ndarray-ops")

function add(out_r, out_i, a_r, a_i, b_r, b_i) {
  ops.add(out_r, a_r, b_r)
  ops.add(out_i, a_i, b_i)
}
exports.add = add

function addeq(out_r, out_i, a_r, a_i) {
  ops.addeq(out_r, a_r)
  ops.addeq(out_i, a_i)
}
exports.addeq = addeq

function adds(out_r, out_i, a_r, a_i, s_r, s_i) {
  ops.adds(out_r, a_r, s_r)
  ops.adds(out_r, a_i, s_i)
}
exports.adds = adds

function addseq(out_r, out_i, s_r, s_i) {
  ops.addseq(out_r, s_r)
  ops.addseq(out_i, s_i)
}
exports.addseq = addseq

function sub(out_r, out_i, a_r, a_i, b_r, b_i) {
  ops.sub(out_r, a_r, b_r)
  ops.sub(out_i, a_i, b_i)
}
exports.sub = sub

function subeq(out_r, out_i, a_r, a_i) {
  ops.subeq(out_r, a_r)
  ops.subeq(out_i, a_i)
}
exports.subeq = subeq

function subs(out_r, out_i, a_r, a_i, s_r, s_i) {
  ops.subs(out_r, a_r, s_r)
  ops.subs(out_i, a_i, s_i)
}
exports.subs = subs

function subseq(out_r, out_i, s_r, s_i) {
  ops.subseq(out_r, s_r)
  ops.subseq(out_i, s_i)
}
exports.subseq = subseq

function neg(out_r, out_i, a_r, a_i) {
  ops.neg(out_r, a_r)
  ops.neg(out_i, a_i)
}
exports.neg = neg

function negeq(out_r, out_i) {
  ops.negeq(out_r)
  ops.negeq(out_i)
}
exports.negeq = negeq

function conj(out_r, out_i, a_r, a_i) {
  ops.assign(out_r, a_r)
  ops.neg(out_i, a_i)
}
exports.conj = conj

function conjeq(out_r, out_i) {
  ops.negeq(out_i)
}
exports.conjeq = conjeq

exports.mul = cwise({
  args: ["array", "array", "array", "array", "array", "array"],
  body: function cmul(out_r, out_i, a_r, a_i, b_r, b_i) {
    var a = a_r
    var b = a_i
    var c = b_r
    var d = b_i
    var k1 = c * (a + b)
    out_r = k1 - b * (c + d)
    out_i = k1 + a * (d - c)
  }
})

exports.muleq = cwise({
  args: ["array", "array", "array", "array"],
  body: function cmuleq(out_r, out_i, a_r, a_i) {
    var a = a_r
    var b = a_i
    var c = out_r
    var d = out_i
    var k1 = c * (a + b)
    out_r = k1 - b * (c + d)
    out_i = k1 + a * (d - c)
  }
})

exports.muls = cwise({
  args: ["array", "array", "array", "array", "scalar", "scalar"],
  pre: function(out_r, out_i, a_r, a_i, s_r, s_i) {
    this.u = s_r + s_i
    this.v = s_i - s_r
  },
  body: function cmuls(out_r, out_i, a_r, a_i, s_r, s_i) {
    var a = a_r
    var b = a_i
    var k1 = s_r * (a + b)
    out_r = k1 - b * this.u
    out_i = k1 + a * this.v
  }
})

exports.mulseq = cwise({
  args: ["array", "array", "scalar", "scalar"],
  pre: function(out_r, out_i, s_r, s_i) {
    this.u = s_r + s_i
    this.v = s_i - s_r
  },
  body: function cmulseq(out_r, out_i, s_r, s_i) {
    var a = out_r
    var b = out_i
    var k1 = s_r * (a + b)
    out_r = k1 - b * this.u
    out_i = k1 + a * this.v
  }
})

exports.div = cwise({
  args: ["array", "array", "array", "array", "array", "array"],
  body: function cdiv(out_r, out_i, a_r, a_i, b_r, b_i) {
    var a = a_r
    var b = a_i
    var c = b_r
    var d = b_i
    var e, f;
    if( Math.abs(c) >= Math.abs(d) ) {
      e = d/c;
      f = c + d*e;
      out_r = (a + b*e) / f;
      out_i = (b - a*e) / f;
    } else {
      e = c/d;
      f = c*e + d;
      out_r = (a*e + b) / f;
      out_i = (b*e - a) / f;
    }
  }
})

exports.diveq = cwise({
  args: ["array", "array", "array", "array"],
  body: function cdiveq(out_r, out_i, a_r, a_i) {
    var a = out_r
    var b = out_i
    var c = a_r
    var d = a_i
    var e, f;
    if( Math.abs(c) >= Math.abs(d) ) {
      e = d/c;
      f = c + d*e;
      out_r = (a + b*e) / f;
      out_i = (b - a*e) / f;
    } else {
      e = c/d;
      f = c*e + d;
      out_r = (a*e + b) / f;
      out_i = (b*e - a) / f;
    }
  }
})

exports.divs = cwise({
  args: ["array", "array", "array", "array", "scalar", "scalar"],
  pre: function(out_r, out_i, a_r, a_i, s_r, s_i) {
    var w = s_r * s_r + s_i * s_i
    s_r /= w
    s_i /= -w
    this.c = s_r
    this.u = s_r + s_i
    this.v = s_i - s_r
  },
  body: function cdivs(out_r, out_i, a_r, a_i, s_r, s_i) {
    var a = a_r
    var b = a_i
    var k1 = this.c * (a + b)
    out_r = k1 - b * this.u
    out_i = k1 + a * this.v
  }
})

exports.divseq = cwise({
  args: ["array", "array", "scalar", "scalar"],
  pre: function(out_r, out_i, s_r, s_i) {
    var w = s_r * s_r + s_i * s_i
    s_r /= w
    s_i /= -w
    this.c = s_r
    this.u = s_r + s_i
    this.v = s_i - s_r
  },
  body: function cdivseq(out_r, out_i, s_r, s_i) {
    var a = out_r
    var b = out_i
    var k1 = this.c * (a + b)
    out_r = k1 - b * this.u
    out_i = k1 + a * this.v
  }
})

exports.recip = cwise({
  args: ["array", "array", "array", "array"],
  body: function crecip(out_r, out_i, a_r, a_i) {
    var a = a_r
    var b = a_i
    var w = a*a + b*b
    out_r = a / w
    out_i = -b / w
  }
})

exports.recipeq = cwise({
  args: ["array", "array"],
  body: function crecipeq(out_r, out_i) {
    var a = out_r
    var b = out_i
    var w = a*a + b*b
    out_r = a / w
    out_i = -b / w
  }
})

exports.exp = cwise({
  args: ["array", "array", "array", "array"],
  pre: function() {
    this.exp = Math.exp
    this.cos = Math.cos
    this.sin = Math.sin
  },
  body: function cexp(out_r, out_i, a_r, a_i) {
    var r = this.exp(a_r)
    out_r = r * this.cos(a_i)
    out_i = r * this.sin(a_i)
  }
})

exports.expeq = cwise({
  args: ["array", "array"],
  pre: function() {
    this.exp = Math.exp
    this.cos = Math.cos
    this.sin = Math.sin
  },
  body: function cexpeq(out_r, out_i) {
    var r = this.exp(out_r)
    var t = out_ir
    out_r = r * this.cos(t)
    out_i = r * this.sin(t)
  }
})

exports.mag = cwise({
  args: ["array", "array", "array"],
  body: function cmag(out, a_r, a_i) {
    out = a_r * a_r + a_i * a_i
  }
})

exports.abs = cwise({
  args: ["array", "array", "array"],
  pre: function() {
    this.sqrt = Math.sqrt
  },
  body: function cabs(out, a_r, a_i) {
    out = this.sqrt(a_r * a_r + a_i * a_i)
  }
})

//Same thing as atan2
exports.arg = ops.atan2
