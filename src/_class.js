var _class = (function() {
    "use strict";

    function _class() {}

    // Creates an object and attaches it to 'this.Obj'
    _class.create = function (constructor) {
        this.Obj = constructor;

        return this;
    };

    // Creates an object like .create() but also inherits the prototype of 'parent'
    // Note that the super constructor must be called explicitly by the user
    _class.extend = function (parent, constructor) {
        this.Obj = constructor;

        this.Obj.prototype = Object.create(parent.prototype);
        this.Obj.prototype.constructor = this.Obj;

        return this;
    };

    // Attaches a method/function to 'this.Obj' prototype
    _class.func = function (name, func) {
        this.Obj.prototype[name] = func;

        return this;
    };

    // Attaches a method .get[propName] (Just syntax sugar for getters and setters)
    _class.get = function(propName, getter) {
        _accessor.call(this, "get", propName, getter);

        return this;
    };

    // Just like .get() but for the setter
    _class.set = function(propName, setter) {
        _accessor.call(this, "set", propName, setter);

        return this;
    };

    // Returns the created object
    _class.finish = function () {
        return this.Obj;
    };

    // Returns a string of a type 'nameXxxxx'
    function _filterPropName(name) {
        return name[0].toUpperCase() + name.toLowerCase().substr(1, name.length);
    }

    // Accessor functionality
    function _accessor(type, propName, func) {
        var name = _filterPropName(propName);

        this.Obj.prototype[type + name] = func;
    }

    return _class;
}());

// node
module.exports = _class;
