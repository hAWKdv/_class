var jclass = (function() {
    "use strict";

    function jclass() {}

    // Creates an object and attaches it to 'this.Obj'
    jclass.create = function (constructor) {
        this.Obj = constructor;

        return this;
    };

    // Creates an object like .create() but also inherits the prototype of 'parent'
    // Note that the super constructor must be called explicitly by the user
    jclass.extend = function (parent, constructor) {
        this.Obj = constructor;

        this.Obj.prototype = Object.create(parent.prototype);
        this.Obj.prototype.constructor = this.Obj;

        return this;
    };

    // Attaches a method/function to 'this.Obj' prototype
    jclass.func = function (name, func) {
        this.Obj.prototype[name] = func;

        return this;
    };

    // Uses Object.defineProperty to define the getter of the provided prop
    jclass.get = function (propName, getter) {
        Object.defineProperty(this.Obj.prototype, propName, {
            get: getter,
            configurable: true,
            enumerable: true
        });

        return this;
    };

    // Just like .get() but for the setter
    jclass.set = function (propName, setter) {
        Object.defineProperty(this.Obj.prototype, propName, {
            set: setter,
            configurable: true,
            enumerable: true
        });

        return this;
    };

    jclass.const = function (name, value) {
        Object.defineProperty(this.Obj.prototype, name, {
            value: value,
            writable: false
        });

        return this;
    };

    // Returns the created object
    jclass.finish = function () {
        return this.Obj;
    };

    return jclass;
}());

// node
module.exports = jclass;
