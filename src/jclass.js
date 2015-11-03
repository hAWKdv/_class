var jclass = (function() {
    "use strict";

    function jclass() {}

    jclass.create = function (constructor) {
        this.Obj = constructor;

        return this;
    };

    jclass.extends = function (parent, constructor) {
        this.Obj = constructor;

        this.Obj.prototype = Object.create(parent.prototype);
        this.Obj.prototype.constructor = this.Obj;

        return this;
    };

    jclass.func = function (name, func) {
        this.Obj.prototype[name] = func;

        return this;
    };

    jclass.get = function(propName, getter) {
        _accessor.call(this, "get", propName, getter);

        return this;
    };

    jclass.set = function(propName, setter) {
        _accessor.call(this, "set", propName, setter);

        return this;
    };

    jclass.finish = function () {
        return this.Obj;
    };

    function _filterPropName(name) {
        return name[0].toUpperCase() + name.toLowerCase().substr(1, name.length);
    }

    function _accessor(type, propName, func) {
        var name = _filterPropName(propName);

        this.Obj.prototype[type + name] = func;
    }

    return jclass;
}());

// node
module.exports = jclass;
