![_class](misc/logo.png)
========================

A small and lightweight library for working with JavaScript classes.

**V1.5.2**

## Changelog
The following have been changed/added since *v1.0*:

- ```.get()``` and ```.set()``` are using ```Object.defineProperty``` now.
- Implemented ```.const()``` for constant/read-only properties.
- Implemented ```.staticFunc()``` for adding of static functions. [v1.5.1]
- Added ```this.$super``` property to derived classes (A reference to the super class). [v1.5.2]

## API
The library provides few methods:

- ```.create(constructor)``` - Creates an object by a provided *consturctor*.
- ```.extend(parentClass, constructor)``` - Creates and inherits an object by provided *parentClass* and *constructor*.
- ```.func(name, function)``` - Attaches the provided *function* to the prototype of the constructed object.
- ```.staticFunc(name, function)``` - Attaches the provided *function* to the constructed object. Acts like static function.
- ```.get(propertyName, getter)``` and ```.set(propertyName, setter)``` - Object.defineProperty-based accessors.
- ```.const(name, value)``` - Creates a constant in the object prototype.
- ```.finish()``` - Returns the created object. **Warning** unfinished objects will be overwritten on next use of *.create()* or *.extend()*! That's why you must always use *.finish()* after declaration/definition of a class.

Special properties:

- ```this.$super``` - provides a reference to the super class.

## Demo
Let's create a simple class named ```Point```
```javascript
var Point = _class.create(function(x, y) {
        this.x = x;
        this.y = y;
    })
    .func("toString", function () {
        return this.x + ", " + this.y;
    })
    
    // Defining a constant
    .const("PI", 3.14)
    .finish();
```

Now we can extend it with ```Point3D```
```javascript
var Point3D = _class.extend(Point, function(x, y, z, name) {
        this.$super.call(this, x, y); // Calling the super constructor

        this.z = z;
        this.name = name;
    })

    // Now we can access '_name' through 'name'
    .get("name", function () {
        return this._name;
    })

    // ... and set it the same way
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
```

Noting that we can define a static class this way:
```javascript
var StaticDemo = _class.create()
    .staticFunc("sayHello", function() {
        console.log("Hello!");
    })
    .finish();
```

... and after that we can run the following code
```javascript
var a = new Point(1, 2);
console.log(a.toString()); // 1, 2
console.log(a.__proto__); // { toString: [Function] }
a.PI = 123;
console.log(a.PI); // 3.14
console.log(a instanceof Point); // true

var b = new Point3D(3, 4, 5, "point");
console.log(b.name); // point
console.log(b.toString()); // 3, 4, 5
console.log(b instanceof Point); // true
console.log(b instanceof Point3D); // true

StaticDemo.sayHello(); // Hello!
```

**Note:** You can run ```npm start``` which executes the demo above (```demo.js```).

## License
MIT
