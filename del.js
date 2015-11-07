"use strict";

var jclass = require("./src/jclass.js");

var Object = jclass.create(function() {})
        .func("toString", function () {});

console.log(Object.Obj.prototype.toString.name);