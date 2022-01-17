function injectRewire(src, filename) {

        var rewireRequires,

            strictMode = "";



        // Search for all rewire() statements an return the required path.

        rewireRequires = getRewireRequires(src);



        // Add all modules that are loaded by rewire() manually to browserify because browserify's

        // require-sniffing doesn't work here.

        rewireRequires.forEach(function forEachRewireRequire(requirePath) {

            // Resolve absolute paths

            if (requirePath.charAt(0) === ".") {

                requirePath = path.resolve(path.dirname(filename), requirePath);

            }

            b.require(requirePath);

        });



        // If the module uses strict mode we must ensure that "use strict" stays at the beginning of the module.

        if (detectStrictMode(src) === true) {

            strictMode = ' "use strict"; ';

        }



        // Convert back slashes to normal slashes.

        filename = filename.replace(/\\/g, "/");



        // We don't want to inject this code at the beginning of a rewire/lib-module. Otherwise

        // it would cause a black hole that devours our universe.

        if (filename.indexOf("/rewire/lib") === -1) {

            src =

                strictMode +    // either '' or ' "use strict"; '

                "/* this line was injected by rewire() */" +

                "var global = window; " +   // window is our new global object

                importGlobalsSrc +

                injectionSrc + "\n" +

                src;

        }



        return src;

    }