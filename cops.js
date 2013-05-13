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
  pre: function() {
    this.a = 0
    this.b = 0
    this.c = 0
    this.d = 0
    this.k1 = 0
  },
  body: function(out_r, out_i, a_r, a_i, b_r, b_i) {
    this.a = a_r
    this.b = a_i
    this.c = b_r
    this.d = b_i
    this.k1 = this.c * (this.a + this.b)
    out_r = this.k1 - this.b * (this.c + this.d)
    out_i = this.k1 + this.a * (this.d - this.c)
  }
})

exports.muleq = cwise({
  args: ["array", "array", "array", "array"],
  pre: function() {
    this.a = 0
    this.b = 0
    this.c = 0
    this.d = 0
    this.k1 = 0
  },
  body: function(out_r, out_i, a_r, a_i, b_r, b_i) {
    this.a = a_r
    this.b = a_i
    this.c = out_r
    this.d = out_i
    this.k1 = this.c * (this.a + this.b)
    out_r = this.k1 - this.b * (this.c + this.d)
    out_i = this.k1 + this.a * (this.d - this.c)
  }
})

exports.muls = cwise({
  args: ["array", "array", "array", "array", "scalar", "scalar"],
  pre: function(out_r, out_i, a_r, a_i, s_r, s_i) {
    this.a = 0
    this.b = 0
    this.k1 = 0
    this.u = s_r + s_i
    this.v = s_i - s_r
  },
  body: function(out_r, out_i, a_r, a_i, s_r, s_i) {
    this.a = a_r
    this.b = a_i
    this.k1 = s_r * (this.a + this.b)
    out_r = this.k1 - this.b * this.u
    out_i = this.k1 + this.a * this.v
  }
})

exports.mulseq = cwise({
  args: ["array", "array", "array", "array", "scalar", "scalar"],
  pre: function(out_r, out_i, s_r, s_i) {
    this.a = 0
    this.b = 0
    this.k1 = 0
    this.u = s_r + s_i
    this.v = s_i - s_r
  },
  body: function(out_r, out_i, s_r, s_i) {
    this.a = out_r
    this.b = out_i
    this.k1 = s_r * (this.a + this.b)
    out_r = this.k1 - this.b * this.u
    out_i = this.k1 + this.a * this.v
  }
})

exports.div = cwise({
  args: ["array", "array", "array", "array", "array", "array"],
  body: function(out_r, out_i, a_r, a_i, b_r, b_i) {
    var a = a_r
    var b = a_i
    var c = b_r
    var d = b_i
    var w = c * c + d * d
    var k1 = c * (a + b)
    out_r = (k1 + b * (c - d)) / w
    out_i = (k1 - a * (d + c)) / w
  }
})

exports.diveq = cwise({
  args: ["array", "array", "array", "array"],
  body: function(out_r, out_i, a_r, a_i, b_r, b_i) {
    var a = out_r
    var b = out_i
    var c = a_r
    var d = a_i
    var w = c * c + d * d
    var k1 = c * (a + b)
    out_r = (k1 + b * (c - d)) / w
    out_i = (k1 - a * (d + c)) / w
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
  body: function(out_r, out_i, a_r, a_i, s_r, s_i) {
    var a = a_r
    var b = a_i
    var k1 = this.c * (a + b)
    out_r = k1 - b * this.u
    out_i = k1 + a * this.v
  }
})

exports.divseq = cwise({
  args: ["array", "array", "array", "array", "scalar", "scalar"],
  pre: function(out_r, out_i, s_r, s_i) {
    var w = s_r * s_r + s_i * s_i
    s_r /= w
    s_i /= -w
    this.c = s_r
    this.u = s_r + s_i
    this.v = s_i - s_r
  },
  body: function(out_r, out_i, s_r, s_i) {
    var a = out_r
    var b = out_i
    var k1 = this.c * (a + b)
    out_r = k1 - b * this.u
    out_i = k1 + a * this.v
  }
})

exports.recip = cwise({
  args: ["array", "array", "array", "array"],
  body: function(out_r, out_i, a_r, a_i) {
    var a = a_r
    var b = a_i
    var w = a*a + b*b
    out_r = a / w
    out_i = -b / w
  }
})

exports.recipeq = cwise({
  args: ["array", "array", "array", "array"],
  body: function(out_r, out_i) {
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
    this.r = 0.0
    this.exp = Math.exp
    this.cos = Math.cos
    this.sin = Math.sin
  },
  body: function(out_r, out_i, a_r, a_i) {
    this.r = exp(a_r)
    out_r = this.r * this.cos(a_i)
    out_i = this.r * this.sin(a_i)
  }
})

exports.expeq = cwise({
  args: ["array", "array", "array", "array"],
  pre: function() {
    this.r = 0.0
    this.t = 0.0
    this.exp = Math.exp
    this.cos = Math.cos
    this.sin = Math.sin
  },
  body: function(out_r, out_i) {
    this.r = exp(out_r)
    this.t = out_ir
    out_r = this.r * this.cos(this.t)
    out_i = this.r * this.sin(this.t)
  }
})

exports.mag = cwise({
  args: ["array", "array", "array"],
  body: function(out, a_r, a_i) {
    out = a_r * a_r + a_i * a_i
  },
  post: function(out) {
    return out
  }
})

exports.abs = cwise({
  args: ["array", "array", "array"],
  pre: function() {
    this.sqrt = Math.sqrt
  },
  body: function(out, a_r, a_i) {
    out = this.sqrt(a_r * a_r + a_i * a_i)
  },
  post: function(out) {
    return out
  }
})

//Same thing as atan2
exports.arg = ops.atan2
