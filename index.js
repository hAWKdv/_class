var jclass = require("./src/jclass");

var Point = jclass.create(function(x, y) {
        this.x = x;
        this.y = y;
    })
    .func("sum", function () {
        return this.x + this.y;
    })
    .func("toString", function () {
        return "[" + this.x + ", " + this.y + "]";
    })
    .finish();


var Point3D = jclass.extends(Point, function (x, y, z) {
        Point.call(this, x, y); // Calling super constructor

        this.z = z;
    })
    .func("toString", function() {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    })
    .finish();

var Person = jclass.create(function(name) {
        this._name = name;
    })
    .get("name", function () {
        return this._name;
    })
    .set("name", function (value) {
        if (value.length < 6) {
            console.log("The name is too short.");
            return;
        }

        this._name = value;
    })
    .func("sayName", function() {
        console.log("My name is " + this._name);
    })
    .finish();


var a = new Point(1, 2);
console.log(a.sum());
console.log(a.toString());
console.log(a.__proto__);

console.log("-----------------");

var b = new Point3D(3, 4, 5);
console.log(b.sum());
console.log(b.toString());
console.log(b.__proto__);
console.log(b instanceof Point);
console.log(b instanceof Point3D);

console.log("-----------------");

var pesho = new Person("pesho");
pesho.setName("p");
console.log(pesho.getName());
pesho.sayName();
console.log(pesho.__proto__);