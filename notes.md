A constructor in Javascript is just a function that happens to be called with the "new" keyword operator.

function Person(name){
    this.name = name
    this.sayHi = function(){
        return 'Hi, I am ' + this.name
    }
}

This is actually not the optimal way to do it. A better way is to define the method on Person.prototype

function Person(name){
    this.name = name
}
Person.prototype.sayHi = function(){
    return 'Hi, I am ' + this.name
}

declaring methods on the prototype is more memory efficient.

var jack = new Person('Jack')
var jill = new Person('Jill')
jack.sayHi()
// 'Hi, I am Jack'
jill.sayHi()
// 'Hi, I am Jill'

Here, sayHi is not attached to jack or jill, rather, it’s attached to their prototype: Person.prototype. How does the function sayHi know jack and jill’s names?

    Answer: this is not bound to any particular object until you call the function.

When you call jack.sayHi(), sayHi’s this will be bound to jack; when you call jill.sayHi(), it will be bound to jill instead, but binding does not change anything about the function itself - it’s still the same function!

It turns out that you can explicitly bind a function to an object yourself.






function Graph () {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v) {
    this.vertices.push(v);

  }
};

var g = new Graph();

g is an object with own properties vertices and edges
and if you get the g.[[prototype]] is the value of Graph.prototype when new Graph() is executed

With Object.create

ECMAScript 5 introduced a new method: Object.create(). Calling this method creates a new object. The prototype of this object is the first argument of the function:

var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (inherited)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty);
// undefined, because d doesn't inherit from Object.prototype

With the class keyword

ECMAScript 2015 introduced a new set of keywords implementing classes. Although these constructs look like those familiar to developers of class-based languages, they are not the same. JavaScript remains prototype-based. The new keywords include class, constructor, static, extends, and super.

'use strict';

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);



-------------------------------
CSS CALL OUT box

body {
	font-family: Helvetica;
	font-size: 13px;
}

div.callout {
	height: 60px;
	width: 200px;
	float: left;
}

div.callout {
	background-color: #444;
	background-image: -moz-linear-gradient(top, #444, #444);
	position: relative;
	color: #ccc;
	padding: 10px;
	border-radius: 3px;
	box-shadow: 0px 0px 20px #999;
	margin: 25px;
	min-height: 50px;
	border: 1px solid #333;
	text-shadow: 0 0 1px #000;

	/*box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset;*/
}

.callout::before {
	content: "";
	width: 0px;
	height: 0px;
	border: 0.8em solid transparent;
	position: absolute;
}

.callout.top::before {
	left: 45%;
	bottom: -20px;
	border-top: 10px solid #444;
}

.callout.bottom::before {
	left: 45%;
	top: -20px;
	border-bottom: 10px solid #444;
}

.callout.left::before {
	right: -20px;
	top: 40%;
	border-left: 10px solid #444;
}

.callout.right::before {
	left: -20px;
	top: 40%;
	border-right: 10px solid #444;
}

.callout.top-left::before {
	left: 7px;
	bottom: -20px;
	border-top: 10px solid #444;
}

.callout.top-right::before {
	right: 7px;
	bottom: -20px;
	border-top: 10px solid #444;
}
