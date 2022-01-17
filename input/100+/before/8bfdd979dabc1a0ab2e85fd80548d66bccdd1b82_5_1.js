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

            setTimeout: setTimeout

        },

        console: console

    }, filename);

}