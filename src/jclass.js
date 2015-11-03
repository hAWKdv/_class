var jclass = (function() {
    "use strict";

    function jclass() {}

    jclass.create = function (constructor) {
        jclass.Obj = constructor;

        return this;
    };

    jclass.extends = function (parent, constructor) {
        jclass.Obj = constructor;

        jclass.Obj.prototype = Object.create(parent.prototype);
        jclass.Obj.prototype.constructor = jclass.Obj;

        return this;
    };

    jclass.func = function (name, func) {
        jclass.Obj.prototype[name] = func;

        return this;
    };

    jclass.get = function(propName, getter) {
        var name = _filterPropName(propName);

        jclass.Obj.prototype["get" + name] = getter;

        return this;
    };

    jclass.set = function(propName, setter) {
        var name = _filterPropName(propName);

        jclass.Obj.prototype["set" + name] = setter;

        return this;
    };

    jclass.finish = function () {
        return jclass.Obj;
    };

    function _filterPropName(name) {
        return name[0].toUpperCase() + name.toLowerCase().substr(1, name.length);
    }


    return jclass;
}());

module.exports = jclass;