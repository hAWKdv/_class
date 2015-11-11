/*
 * jclass
 * v1.5.2
 * Author: hAWK
 * Repository: https://github.com/hAWKdv/jclass
 * License: MIT
 */

var jclass = (function() {
    "use strict";

    // Constructor
    function jclass() {}

    // Creates an object and attaches it to 'this.Obj'
    jclass.create = function (constructor) {
        this.Obj = constructor || function () {};

        return this;
    };

    // Creates an object like .create() but also inherits the prototype of 'parent'
    // Note that the super constructor must be called explicitly by the user
    jclass.extend = function (parent, constructor) {
        this.Obj = constructor || function () {};

        this.Obj.prototype = Object.create(parent.prototype);
        this.Obj.prototype.constructor = this.Obj;

        this.Obj.prototype.$super = parent;

        return this;
    };

    // Attaches a method/function to 'this.Obj' prototype
    jclass.func = function (name, func) {
        this.Obj.prototype[name] = func || function () {};

        return this;
    };

    // Attaches a static method/function to 'this.Obj'
    jclass.staticFunc = function (name, func) {
        this.Obj[name] = func || function () {};

        return this;
    };

    // Uses 'Object.defineProperty' to define the getter of the provided prop
    jclass.get = function (propName, getter) {
        _accessor.call(this, "get", propName, getter);

        return this;
    };

    // Same as .get() but for the setter accessor
    jclass.set = function (propName, setter) {
        _accessor.call(this, "set", propName, setter);

        return this;
    };

    // Creates a read-only property via 'Object.defineProperty'
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

    function _accessor(type, propName, accessorFunc) {
        var defPropObj = {
            configurable: true,
            enumerable: true
        };

        defPropObj[type] = accessorFunc || function () {};

        Object.defineProperty(this.Obj.prototype, propName, defPropObj);
    }

    return jclass;
}());

// node
module.exports = jclass;
