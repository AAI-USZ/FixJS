function () {

        var context = {

                global: global

            },

            ignore = ["console", "setTimeout"],

            src,

            actualGlobals,

            expectedGlobals = Object.keys(global);



        src = getImportGlobalsSrc(ignore);

        expectedGlobals = expectedGlobals.filter(function filterIgnoredVars(value) {

            return ignore.indexOf(value) === -1;

        });

        vm.runInNewContext(src, context);

        actualGlobals = Object.keys(context);

        actualGlobals.sort();

        expectedGlobals.sort();

        expect(actualGlobals).to.eql(expectedGlobals);

        expect(actualGlobals.length).to.be.above(1);

    }