![jclass](misc/logo.png)
========================

A small and lightweight library for working with JavaScript classes.
**V1.5**

## API
The library provides few methods:

- ```.create(constructor)``` - Creates an object by a provided *consturctor*.
- ```.extend(parentClass, constructor)``` - Creates and inherits an object by provided *parentClass* and *constructor*.
- ```.func(function)``` - Attaches the provided *function* to the prototype of the constructed object.
- ```.get(propertyName, getter)``` and ```.set(propertyName, setter)``` - Object.defineProperty-based accessors.
- ```.finish()``` - Returns the created object.

## Demo
Let's create a simple class named ```Point```
```javascript
var Point = jclass.create(function(x, y) {
        this.x = x;
        this.y = y;
    })
    .func("toString", function () {
        return this.x + ", " + this.y;
    })
    .finish();
```

Now we can extend it with ```Point3D```
```javascript
var Point3D = jclass.extend(Point, function(x, y, z, name) {
        Point.call(this, x, y); // Calling the super constructor

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
        return Point.prototype.toString.call(this) + ", " + this.z;
        //     ^ that way we are using the Point's .toString()
    })
    .finish();
```

... and after that we can run the following code
```javascript
var a = new Point(1, 2);
console.log(a.toString()); // 1, 2
console.log(a.__proto__); // { toString: [Function] }
console.log(a instanceof Point); // true

var b = new Point3D(3, 4, 5, "point");
console.log(b.name); // point
console.log(b.toString()); // 3, 4, 5
console.log(b instanceof Point); // true
console.log(b instanceof Point3D); // true
```

**Note:** You can run ```npm start``` which executes the demo above (```demo.js```).

## License
MIT
