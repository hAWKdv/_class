"use strict";

var expect = require("chai").expect,
    jclass = require("../src/_class");

describe("_class", function() {
    describe("core methods", function() {
        describe(".create()", function() {
            it("should be a _class function (static)", function () {
                var Object = jclass.create(/*function () {}*/);

                expect(Object).to.be.equal(jclass);
            });
        });

        describe(".func()", function() {
            it("should attach method to the object", function () {
                var Object = jclass.create(function () {})
                    .func("toString"/*, function () {}*/);

                expect(Object.Obj.prototype.toString).to.be.not.equal(undefined);
            });
        });

        describe(".staticFunc()", function() {
            it("should attach static method to the object", function () {
                var Object = jclass.create(function () {})
                    .staticFunc("calculateData"/*, function () {}*/);

                expect(Object.Obj.calculateData).to.be.not.equal(undefined);
            });
        });

        describe(".get()", function() {
            it("should attach getter to the object", function () {
                var TestObj = jclass.create(function () {
                        this._name = "obj";
                    })
                    .get("name", function () {
                        return this._name;
                    })
                    .finish();

                var testObj = new TestObj();

                expect(testObj.name).to.be.equal("obj");
            });
        });

        describe(".set()", function() {
            it("should attach setter to the object holder", function () {
                var TestObj = jclass.create(function () {
                        this._name = "obj";
                    })
                    .set("name", function (value) {
                        this._name = value;
                    })
                    .finish();

                var testObj = new TestObj();
                testObj.name = "not_obj";

                expect(testObj._name).to.be.equal("not_obj");
            });
        });

        describe(".const()", function() {
            it("should attach a const to the object", function () {
                var TestObj = jclass.create(/*function () {}*/)
                    .const("PI", 3.14)
                    .finish();

                var testObj = new TestObj();

                expect(function() { testObj.PI = 0 }).to.throw(TypeError);
            });
        });

        describe(".finish()", function() {
            it("should return ready object", function () {
                var isItFinished = false,
                    Point = jclass.create(function () {
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
            var Point = jclass.create(/*function () {}*/).finish(),
                x = new Point();

            expect(x).to.be.an.instanceof(Point);
        });

        it("should inherit the parent (Point)", function() {
            var Point = jclass.create(/*function () {}*/).finish(),
                Point3D = jclass.extend(Point/*, function () {}*/).finish(),
                xyz = new Point3D();

            expect(xyz).to.be.an.instanceof(Point)
                .and.to.be.an.instanceof(Point3D);
        });

        it("should call super class (Point)", function() {
            var Point = jclass.create(function (x) { this.x = ++x; }).finish(),
                Point3D = jclass.extend(Point, function (x) { this.$super.call(this, x); }).finish(),
                xyz = new Point3D(1);

            expect(xyz.x).to.be.equal(2);
        });
    });
});
