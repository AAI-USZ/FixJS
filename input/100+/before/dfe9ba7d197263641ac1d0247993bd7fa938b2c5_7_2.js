function (done) {

        var pathToBrowserfiyRewire = pathUtil.resolve(__dirname, "../lib/browserify/browserifyRewire.js"),

            context,

            exportsObj = {},

            moduleObj = {exports: exportsObj},

            returnedObj,

            browserifyRewire;



        // Register with fake objects

        // Using null for objects that are not involved in this particular test

        function moduleA() {

            "use strict";



            browserifyRewire.register("/a.js", null, null, null);

            returnedObj = browserifyRewire("/a.js", "/b.js");

        }



        function moduleB() {

            "use strict";



            browserifyRewire.register("/b.js", moduleObj, setter, getter);



            return exportsObj;

        }



        function fakeResolve() {

            return "/b.js";

        }



        function fakeRequire(path, parentModulePath) {

            var module;



            if (path === "../browser/shims.js") {

                return;

            } else if (path === "../getImportGlobalsSrc.js") {

                return require("../lib/getImportGlobalsSrc.js");

            }



            module = moduleB();



            expect(path).to.be("/b.js");

            expect(parentModulePath).to.be("/a.js");

            fakeRequire.cache["/b.js"] = module;



            return module;

        }

        fakeRequire.resolve = fakeResolve;

        fakeRequire.cache =  {};



        function setter() {}

        function getter() {}



        context = {

            module: {},

            console: console,

            window: {

                browserifyRequire: fakeRequire

            },

            require: fakeRequire

        };



        fs.readFile(pathToBrowserfiyRewire, "utf8", function onBrowserifyRewireRead(err, src) {

            vm.runInNewContext(src, context, pathToBrowserfiyRewire);

            browserifyRewire = context.module.exports;



            moduleA();



            expect(returnedObj.__set__).to.be(setter);

            expect(returnedObj.__get__).to.be(getter);

            // Because browserify does not create the module-object newly when executing the module

            // again we have to copy the module object deeply and store that copy in the

            // cache. Therefore we're checking here if the returned exports-object and the

            // cached module-object are an independent copy.

            expect(returnedObj).not.to.be(exportsObj);

            expect(context.window.browserifyRequire.cache["/b.js"]).not.to.be(moduleObj);



            done();

        });

    }