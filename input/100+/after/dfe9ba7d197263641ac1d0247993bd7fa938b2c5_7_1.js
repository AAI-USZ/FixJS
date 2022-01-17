function runInFakeBrowserContext(src, filename) {

    vm.runInNewContext(src, {

        window: {

            console: console,

            describe: describe,

            it: it,

            before: before,

            after: after,

            beforeEach: beforeEach,

            afterEach: afterEach,

            setTimeout: setTimeout,

            clearTimeout: clearTimeout,

            setInterval: setInterval,

            clearInterval: clearInterval,

            parseFloat: parseFloat,

            parseInt: parseInt,

            encodeURIComponent: function () {},

            decodeURIComponent: function () {},

            document: {}

        },

        console: console

    }, filename);

}