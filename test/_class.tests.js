"use strict";

var expect = require("chai").expect,
    _class = require("../src/_class");

describe("_class", function() {
    describe("core methods", function() {
        describe(".create()", function() {
            it("should be a _class function (static)", function () {
                var Object = _class.create(function () {});

                expect(Object).to.be.equal(_class);
            });
        });

        describe(".func()", function() {
            it("should attach method to the object holder", function () {
                var Object = _class.create(function () {})
                    .func("toString", function () {});

                expect(Object.Obj.prototype.toString).to.be.not.equal(undefined);
            });
        });

        describe(".get()", function() {
            it("should attach getter to the object holder", function () {
                var Object = _class.create(function () {})
                    .get("name", function () {});

                expect(Object.Obj.prototype.getName).to.be.not.equal(undefined);
            });
        });

        describe(".set()", function() {
            it("should attach setter to the object holder", function () {
                var Object = _class.create(function () {})
                    .set("name", function () {});

                expect(Object.Obj.prototype.setName).to.be.not.equal(undefined);
            });
        });

        describe(".finish()", function() {
            it("should return ready object", function () {
                var isItFinished = false,
                    Point = _class.create(function () {
                        isItFinished = true;
                    }).finish();

                (new Point());

                //noinspection BadExpressionStatementJS
                expect(isItFinished).to.be.true;
            });
        });
    });

    describe("instantiating", function () {
        it("should be instance of the class (Point)", function () {
            var Point = _class.create(function () {}).finish(),
                x = new Point();

            expect(x).to.be.an.instanceof(Point);
        });

        it("should inherit the parent (Point)", function() {
            var Point = _class.create(function () {}).finish(),
                Point3D = _class.extend(Point, function () {}).finish(),
                xy = new Point3D();

            expect(xy).to.be.an.instanceof(Point)
                .and.to.be.an.instanceof(Point3D);
        })
    });
});