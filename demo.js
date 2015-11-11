var jclass = require("./src/jclass");

// Let's create a simple class named 'Point'
var Point = jclass.create(function(x, y) {
        this.x = x;
        this.y = y;
    })
    .func("toString", function () {
        return this.x + ", " + this.y;
    })
    // Defining a constant
    .const("PI", 3.14)
    .finish();

// Now we can extend it with 'Point3D'
var Point3D = jclass.extend(Point, function(x, y, z, name) {
        this.$super.call(this, x, y); // Calling the super constructor

        this.z = z;
        this.name = name;
    })
    // The following will give us .getName() method
    .get("name", function () {
        return this._name;
    })
    // ... and .setName(val)
    .set("name", function (value) {
        if (!value) {
            console.log("The name is not set.");
            return;
        }

        if (value.length < 2) {
            console.log("The name is too short.");
            return;
        }

        this._name = value;
    })
    .func("toString", function() {
        return this.$super.prototype.toString.call(this) + ", " + this.z;
        //     ^ that way we are using the Point's .toString()
    })
    .finish();

// Noting that we can define a static class this way:
var StaticDemo = jclass.create()
    .staticFunc("sayHello", function() {
        console.log("Hello!");
    })
    .finish();

var a = new Point(1, 2);
console.log(a.toString()); // 1, 2
console.log(a.__proto__); // { toString: [Function] }
a.PI = 123;
console.log(a.PI); // 3.14
console.log(a instanceof Point); // true

console.log("------------------");

var b = new Point3D(3, 4, 5, "point");
console.log(b.name); // point
console.log(b.toString()); // 3, 4, 5
console.log(b instanceof Point); // true
console.log(b instanceof Point3D); // true

console.log("------------------");

StaticDemo.sayHello(); // Hello!
