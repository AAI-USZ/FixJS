f    'use strict';

    //Remove any old builds
    file.deleteFile("builds");

    function c(fileName) {
        return file.readFile(fileName);
    }

    //Remove line returns to make comparisons easier.
    function nol(contents) {
        return contents.replace(/[\r\n]/g, "");
    }

    //Remove \n and \r string literals, since rhino and node
    //do not always agree on what was read from disk, if a
    //trailing \n should be in there. After an optimization,
    //the text file can write out modules with these \r or \n
    //strings.
    function noSlashRn(contents) {
        return contents.replace(/\\n|\\r/g, '');
    }

    //Do a build of the text plugin to get any pragmas processed.
    build(["name=text", "baseUrl=../../../text", "out=builds/text.js", "optimize=none"]);

    //Reset build state for next run.
    require._buildReset();

    var requireTextContents = c("builds/text.js"),
        oneResult = [
            c("../../../requirejs/tests/two.js"),
            c("../../../requirejs/tests/one.js"),
            ";",
            c("../../../requirejs/tests/dimple.js")
        ].join("");

    doh.register("buildOneCssFile",
        [
            function buildOneCssFile(t) {
                build(["cssIn=css/sub/sub1.css", "out=builds/sub1.css"]);

                t.is(nol(c("cssTestCompare.css")), nol(c("builds/sub1.css")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildOneJsFile",
        [
            function buildOneJsFile(t) {
                build(["name=one", "include=dimple", "out=builds/outSingle.js",
                       "baseUrl=../../../requirejs/tests", "optimize=none"]);

                t.is(nol(oneResult), nol(c("builds/outSingle.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildOneJsFileOnlyInclude",
        [
            function buildOneJsFileOnlyInclude(t) {
                build(["include=one,dimple", "out=builds/outSingleOnlyInclude.js",
                       "baseUrl=../../../requirejs/tests", "optimize=none"]);

                t.is(nol(oneResult), nol(c("builds/outSingleOnlyInclude.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();



    doh.register("buildOneJsFileWrapped",
        [
            function buildOneJsFile(t) {
                build(["name=one", "include=dimple", "out=builds/outSingleWrap.js",
                       "baseUrl=../../../requirejs/tests", "optimize=none",
                       "wrap.start=START", "wrap.end=END"]);

                t.is(nol("START" + oneResult + "END"), nol(c("builds/outSingleWrap.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildOneJsFileWrappedTrue",
        [
            function buildOneJsFile(t) {
                build(["name=one", "include=dimple", "out=builds/outSingleWrapTrue.js",
                       "baseUrl=../../../requirejs/tests", "optimize=none",
                       "wrap=true"]);

                t.is(nol("(function () {" + oneResult + "}());"), nol(c("builds/outSingleWrapTrue.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildOneJsFileWrappedFile",
        [
            function buildOneJsFile(t) {
                build(["name=one", "include=dimple", "out=builds/outSingleWrap.js",
                       "baseUrl=../../../requirejs/tests", "optimize=none",
                       "wrap.startFile=start.frag", "wrap.endFile=end.frag"]);

                t.is(nol(c("start.frag") + oneResult + c("end.frag")), nol(c("builds/outSingleWrap.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildSimple",
        [
            function buildSimple(t) {
                //Do the build
                build(["simple.build.js"]);

                t.is(nol(oneResult), nol(c("builds/simple/one.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildSimpleOverride",
        [
            function buildSimple(t) {
                //Do the build
                build(["simple.build.js", "dir=builds/simpleOverride"]);

                t.is(nol(oneResult), nol(c("builds/simpleOverride/one.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();


    doh.register("buildSimpleCommandLineName",
        [
            function buildSimpleCommandLineName(t) {
                //Do the build
                build([
                    "baseUrl=../../../requirejs/tests",
                    "optimize=none",
                    "dir=builds/simpleCommandLineName",
                    "name=one",
                    "include=dimple"
                ]);

                t.is(nol(oneResult), nol(c("builds/simpleCommandLineName/one.js")));

                //Reset require internal state for the contexts so future
                //builds in these tests will work correctly.
                require._buildReset();
            }
        ]
    );
    doh.run();


    doh.register("buildExcludeShallow",
        [
            function buildExcludeShallow(t) {
                build(["name=uno", "excludeShallow=dos", "out=builds/unoExcludeShallow.js",
                       "baseUrl=../../../requirejs/tests", "optimize=none"]);

                t.is(nol(c("expected/unoExcludeShallow.js")), nol(c("builds/unoExcludeShallow.js")));
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildExclude",
        [
            function buildExclude(t) {
                build(["name=uno", "exclude=dos", "out=builds/unoExclude.js",
                       "baseUrl=../../../requirejs/tests", "optimize=none"]);

                t.is(nol(c("../../../requirejs/tests/uno.js")), nol(c("builds/unoExclude.js")));
                require._buildReset();
            }
        ]
    );
    doh.run();

    doh.register("buildTextPluginIncluded",
        [
            function buildTextPluginIncluded(t) {
                build(["name=one", "include=text", "out=builds/oneText.js",
                       "baseUrl=../../../requirejs/tests", "paths.text=../../text/text", "optimize=none"]);

                t.is(nol(nol(c("../../../requirejs/tests/two.js") +
                         c("../../../requirejs/tests/one.js") + ";") +
                         requireTextContents), nol(c("builds/oneText.js")));
                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("buildPluginAsModule",
        [
            function buildPluginAsModule(t) {
                build(["name=refine!a", "out=builds/refineATest.js",
                       "baseUrl=../../../requirejs/tests/plugins/fromText",
                       "exclude=text,refine",
                       "paths.text=../../../../text/text", "optimize=none"]);

                t.is(nol(nol((c("../../../requirejs/tests/plugins/fromText/a.refine"))
                             .replace(/refine/g, 'define')))
                             .replace(/define\(\{/, "define('refine!a',{"),
                         nol(c("builds/refineATest.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();


    doh.register("buildUniversal",
        [
            function buildUniversal(t) {
                build(["baseUrl=../../../requirejs/tests/universal",
                       "name=universal-tests",
                       "out=../../../requirejs/tests/universal/universal-tests-built.js",
                       "optimize=none"]);

                t.is(nol(c("../../../requirejs/tests/universal/universal-tests-built-expected.js")),
                     nol(c("../../../requirejs/tests/universal/universal-tests-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();


    doh.register("buildNamespace",
        [
            function buildNamespace(t) {
                build(["baseUrl=lib/namespace", "optimize=none", "namespace=foo",
                       "name=main", "out=lib/namespace/foo.js"]);

                t.is(nol(c("lib/namespace/expected.js")),
                     nol(c("lib/namespace/foo.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("useDotPackage",
        [
            function useDotPackage(t) {
                build(["lib/dotpackage/scripts/app.build.js"]);

                t.is(nol(c("lib/dotpackage/scripts/main-expected.js")),
                     nol(c("lib/dotpackage/built/scripts/main.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("multipleEmpty",
        [
            function multipleEmpty(t) {

                build(["lib/empty/build.js"]);

                t.is(nol(c("lib/empty/expected.js")),
                     nol(c("lib/empty/built/main.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("paths.valid",
        [
            function (t) {
                try {
                    build(["lib/paths/valid/build.js"]);
                    t.is(nol(c("lib/paths/valid/expected.js")),
                         nol(c("lib/paths/valid/built/main.js")));
                }
                finally {
                    file.deleteFile("lib/paths/valid/built");
                    require._buildReset();
                }
            }
        ]
    );
    doh.run();

    doh.register("preserveLicense",
        [
            function preserveLicense(t) {
                file.deleteFile("lib/comments/built.js");

                build(["lib/comments/build.js"]);

                t.is(nol(c("lib/comments/expected.js")),
                     nol(c("lib/comments/built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedFind",
        [
            function nestedFind(t) {
                file.deleteFile("lib/nested/main-builtWithCE.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nested/buildWithCE.js"]);

                t.is(nol(c("lib/nested/expected-builtWithCE.js")),
                     nol(c("lib/nested/main-builtWithCE.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedSkip",
        [
            function nestedSkip(t) {
                file.deleteFile("lib/nested/main-built.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nested/build.js"]);

                t.is(nol(c("lib/nested/expected-built.js")),
                     nol(c("lib/nested/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedHas",
        [
            function nestedHas(t) {
                file.deleteFile("lib/nestedHas/main-built.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nestedHas/build.js"]);

                t.is(nol(c("lib/nestedHas/expected-built.js")),
                     nol(c("lib/nestedHas/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedHasNeedAll",
        [
            function nestedHasNeedAll(t) {
                file.deleteFile("lib/nestedHas/main-builtNeedAll.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nestedHas/buildNeedAll.js"]);

                t.is(nol(c("lib/nestedHas/expected-builtNeedAll.js")),
                     nol(c("lib/nestedHas/main-builtNeedAll.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedHasNeedB",
        [
            function nestedHasNeed(t) {
                file.deleteFile("lib/nestedHas/main-builtNeedB.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nestedHas/buildNeedB.js"]);

                t.is(nol(c("lib/nestedHas/expected-builtNeedB.js")),
                     nol(c("lib/nestedHas/main-builtNeedB.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedHasNeedC",
        [
            function nestedHasNeed(t) {
                file.deleteFile("lib/nestedHas/main-builtNeedC.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nestedHas/buildNeedC.js"]);

                t.is(nol(c("lib/nestedHas/expected-builtNeedC.js")),
                     nol(c("lib/nestedHas/main-builtNeedC.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedHasNeedD",
        [
            function nestedHasNeedD(t) {
                file.deleteFile("lib/nestedHas/main-builtNeedD.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nestedHas/buildNeedD.js"]);

                t.is(nol(c("lib/nestedHas/expected-builtNeedD.js")),
                     nol(c("lib/nestedHas/main-builtNeedD.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nestedHasNested",
        [
            function nestedHasNested(t) {
                file.deleteFile("lib/nestedHas/main-builtNested.js");

                //Clear the cached file contents since the
                //findNestedDependencies config actually modifies
                //what the contents could be.
                require._cachedFileContents = {};

                build(["lib/nestedHas/buildNested.js"]);

                t.is(nol(c("lib/nestedHas/expected-builtNested.js")),
                     nol(c("lib/nestedHas/main-builtNested.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("amdefineStrip",
        [
            function amdefineStrip(t) {
                file.deleteFile("lib/amdefine/built.js");

                build(["lib/amdefine/build.js"]);

                t.is(nol(c("lib/amdefine/expected.js")),
                     nol(c("lib/amdefine/built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("nameInsertion",
        [
            function nameInsertion(t) {
                file.deleteFile("lib/nameInsertion/built.js");

                build(["lib/nameInsertion/build.js"]);

                t.is(nol(c("lib/nameInsertion/expected.js")),
                     nol(c("lib/nameInsertion/built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("moduleThenPlugin",
        [
            function moduleThenPlugin(t) {
                file.deleteFile("lib/moduleThenPlugin/built.js");

                build(["lib/moduleThenPlugin/build.js"]);

                t.is(nol(c("lib/moduleThenPlugin/expected.js")),
                     nol(c("lib/moduleThenPlugin/built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("pluginsWithDeps",
        [
            function pluginsWithDeps(t) {
                file.deleteFile("lib/plugins/main-built.js");

                build(["lib/plugins/build.js"]);

                t.is(nol(c("lib/plugins/expected.js")),
                     nol(c("lib/plugins/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("pluginFirstWithDeps",
        [
            function pluginFirstWithDeps(t) {
                file.deleteFile("lib/plugins/main-builtPluginFirst.js");

                build(["lib/plugins/buildPluginFirst.js"]);

                t.is(nol(c("lib/plugins/expected.js")),
                     nol(c("lib/plugins/main-builtPluginFirst.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("mainConfigFileBasic",
        [
            function mainConfigFileBasic(t) {
                file.deleteFile("lib/mainConfigFile/basic/main-built.js");

                build(["lib/mainConfigFile/basic/tools/build.js"]);

                t.is(nol(c("lib/mainConfigFile/basic/expected.js")),
                     nol(c("lib/mainConfigFile/basic/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("mainConfigFileBasicCommand",
        [
            function mainConfigFileBasic(t) {
                file.deleteFile("lib/mainConfigFile/basic/main-built.js");

                build([
                    "mainConfigFile=lib/mainConfigFile/basic/www/js/main.js",
                    "name=main",
                    "out=lib/mainConfigFile/basic/main-built.js",
                    "optimize=none"
                ]);

                t.is(nol(c("lib/mainConfigFile/basic/expected.js")),
                     nol(c("lib/mainConfigFile/basic/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("mainConfigFileMerged",
        [
            function mainConfigFileMerged(t) {
                file.deleteFile("lib/mainConfigFile/mergeConfig/main-built.js");

                build(["lib/mainConfigFile/mergeConfig/tools/build.js"]);

                t.is(nol(c("lib/mainConfigFile/mergeConfig/expected.js")),
                     nol(c("lib/mainConfigFile/mergeConfig/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("onBuildRead",
        [
            function onBuildRead(t) {
                file.deleteFile("lib/onBuildRead/main-built.js");

                build(["lib/onBuildRead/build.js"]);

                t.is(nol(c("lib/onBuildRead/expected.js")),
                     nol(c("lib/onBuildRead/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("onBuildWrite",
        [
            function onBuildWrite(t) {
                file.deleteFile("lib/onBuildWrite/main-built.js");

                build(["lib/onBuildWrite/build.js"]);

                t.is(nol(c("lib/onBuildWrite/expected.js")),
                     nol(c("lib/onBuildWrite/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("pristineSrc",
        [
            //Makes sure source locations are not overwritten by the
            //normalization of paths to be absolute, when an appDir is
            //in play.
            function pristineSrc(t) {

                build(["lib/pristineSrc/build.js"]);

                t.is(nol(c("lib/pristineSrc/expected-main.js")),
                     nol(c("lib/pristineSrc/built/main.js")));

                t.is(nol(c("lib/pristineSrc/expected-lib.js")),
                     nol(c("lib/pristineSrc/built/vendor/lib.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("intDefine",
        [
            function intDefine(t) {
                file.deleteFile("lib/intDefine/main-built.js");

                build(["lib/intDefine/build.js"]);

                t.is(nol(c("lib/intDefine/expected.js")),
                     nol(c("lib/intDefine/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("cssDuplicates",
        [
            function cssDuplicates(t) {
                file.deleteFile("lib/cssDuplicates/main-built.css");

                build(["lib/cssDuplicates/build.js"]);

                t.is(nol(c("lib/cssDuplicates/expected.css")),
                     nol(c("lib/cssDuplicates/main-built.css")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("cssKeepComments",
        [
            function cssKeepComments(t) {
                file.deleteFile("lib/cssKeepComments/main-built.css");

                build(["lib/cssKeepComments/build.js"]);

                t.is(nol(c("lib/cssKeepComments/expected.css")),
                     nol(c("lib/cssKeepComments/main-built.css")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("cssKeepLicense",
        [
            function cssKeepLicense(t) {
                file.deleteFile("lib/cssKeepLicense/main-built.css");

                build(["lib/cssKeepLicense/build.js"]);

                t.is(nol(c("lib/cssKeepLicense/expected.css")),
                     nol(c("lib/cssKeepLicense/main-built.css")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("cssKeepLicenseNoLicense",
        [
            function cssKeepLicenseNoLicense(t) {
                file.deleteFile("lib/cssKeepLicense/main-nolicense-built.css");

                build(["lib/cssKeepLicense/build-nolicense.js"]);

                t.is(nol(c("lib/cssKeepLicense/expected-nolicense.css")),
                     nol(c("lib/cssKeepLicense/main-nolicense-built.css")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/167 @import in media query
    doh.register("cssMediaQuery",
        [
            function cssMediaQuery(t) {
                file.deleteFile("lib/cssMediaQuery/main-built.css");

                build(["lib/cssMediaQuery/build.js"]);

                t.is(nol(c("lib/cssMediaQuery/expected.css")),
                     nol(c("lib/cssMediaQuery/main-built.css")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/150
    doh.register("appDirSrcOverwrite",
        [
            function appDirSrcOverwrite(t) {

                build(["lib/appDirSrcOverwrite/build.js"]);

                //Make sure source file was not accidentally overwritten
                t.is(nol(c("lib/appDirSrcOverwrite/src-app.js")),
                     nol(c("lib/appDirSrcOverwrite/www/js/app.js")));

                //Make sure built file contains the expected contents.
                t.is(nol(c("lib/appDirSrcOverwrite/expected-app.js")),
                     nol(c("lib/appDirSrcOverwrite/www-built/js/app.js")));


                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/151
    doh.register("jqueryConfig",
        [
            function jqueryConfig(t) {
                file.deleteFile("lib/jqueryConfig/main-built.js");

                build(["lib/jqueryConfig/build.js"]);

                t.is(nol(c("lib/jqueryConfig/expected.js")),
                     nol(c("lib/jqueryConfig/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/125
    doh.register("transportBeforeMinify",
        [
            function transportBeforeMinify(t) {

                build(["lib/transportBeforeMinify/build.js"]);

                //Make sure the dependencies are listed as an array in the
                //file that is not part of a build layer, but still uglified
                var contents = nol(c("lib/transportBeforeMinify/www-built/js/b.js"));
                t.is(true, /define\(\["require"\,"a"\]\,function/.test(contents));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/138
    doh.register("cssComment138",
        [
            function cssComment138(t) {
                file.deleteFile("lib/cssComment138/main-built.css");

                build(["lib/cssComment138/build.js"]);

                t.is(nol(c("lib/cssComment138/expected.css")),
                     nol(c("lib/cssComment138/main-built.css")));

                require._buildReset();
            }

        ]
    );
    doh.run();


    doh.register("shimBasic",
        [
            function shimBasic(t) {
                var outFile = "../../../requirejs/tests/shim/built/basic-tests.js";

                file.deleteFile(outFile);

                build(["lib/shimBasic/build.js"]);

                //Also remove spaces, since rhino and node differ on their
                //Function.prototype.toString() output by whitespace, and
                //the semicolon on end of A.name
                t.is(nol(c("lib/shimBasic/expected.js")).replace(/\s+/g, '').replace(/A\.name\;/g, 'A.name'),
                     nol(c(outFile)).replace(/\s+/g, '').replace(/A\.name\;/g, 'A.name'));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("mapConfig",
        [
            function mapConfig(t) {
                var outFile = "../../../requirejs/tests/mapConfig/built/mapConfig-tests.js";

                file.deleteFile(outFile);

                build(["lib/mapConfig/build.js"]);

                t.is(nol(c("lib/mapConfig/expected.js")),
                     nol(c(outFile)));

                require._buildReset();
            }

        ]
    );
    doh.run();

    doh.register("mapConfigStar",
        [
            function mapConfigStar(t) {
                var outFile = "../../../requirejs/tests/mapConfig/built/mapConfigStar-tests.js";

                file.deleteFile(outFile);

                build(["lib/mapConfig/buildStar.js"]);

                t.is(nol(c("lib/mapConfig/expectedStar.js")),
                     nol(c(outFile)));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/requirejs/issues/277
    doh.register("mapConfigStarAdapter",
        [
            function mapConfigStar(t) {
                var outFile = "../../../requirejs/tests/mapConfig/built/mapConfigStarAdapter-tests.js";

                file.deleteFile(outFile);

                build(["lib/mapConfig/buildStarAdapter.js"]);

                t.is(nol(c("lib/mapConfig/expectedStarAdapter.js")),
                     nol(c(outFile)));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/165 insertRequire
    doh.register("insertRequire",
        [
            function insertRequire(t) {
                file.deleteFile("lib/insertRequire/main-built.js");

                build(["lib/insertRequire/build.js"]);

                t.is(nol(c("lib/insertRequire/expected.js")),
                     nol(c("lib/insertRequire/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/30 removeCombined
    doh.register("removeCombinedApp",
        [
            function removeCombinedApp(t) {

                build(["lib/removeCombined/build.js"]);

                t.is(nol(c("lib/removeCombined/expected-main.js")),
                     nol(c("lib/removeCombined/app-built/js/main.js")));
                t.is(nol(c("lib/removeCombined/expected-secondary.js")),
                     nol(c("lib/removeCombined/app-built/js/secondary.js")));
                t.is(false, file.exists("lib/removeCombined/app-built/js/a.js"));
                t.is(false, file.exists("lib/removeCombined/app-built/js/b.js"));
                t.is(false, file.exists("lib/removeCombined/app-built/js/c.js"));
                t.is(true, file.exists("lib/removeCombined/app-built/js/d.js"));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/30 removeCombined
    doh.register("removeCombinedBaseUrl",
        [
            function removeCombinedBaseUrl(t) {

                build(["lib/removeCombined/build-baseUrl.js"]);

                t.is(nol(c("lib/removeCombined/expected-main.js")),
                     nol(c("lib/removeCombined/baseUrl-built/main.js")));
                t.is(nol(c("lib/removeCombined/expected-secondary.js")),
                     nol(c("lib/removeCombined/baseUrl-built/secondary.js")));
                t.is(false, file.exists("lib/removeCombined/baseUrl-built/a.js"));
                t.is(false, file.exists("lib/removeCombined/baseUrl-built/b.js"));
                t.is(false, file.exists("lib/removeCombined/baseUrl-built/c.js"));
                t.is(true, file.exists("lib/removeCombined/baseUrl-built/d.js"));

                require._buildReset();
            }

        ]
    );
    doh.run();


    //Tests https://github.com/jrburke/r.js/issues/163 URLs as empty:
    doh.register("urlToEmpty",
        [
            function urlToEmpty(t) {
                file.deleteFile("lib/urlToEmpty/main-built.js");

                build(["lib/urlToEmpty/build.js"]);

                t.is(nol(c("lib/urlToEmpty/expected.js")),
                     nol(c("lib/urlToEmpty/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/116 stub modules
    doh.register("stubModules",
        [
            function stubModules(t) {
                file.deleteFile("lib/stubModules/main-built.js");

                build(["lib/stubModules/build.js"]);

                t.is(noSlashRn(nol(c("lib/stubModules/expected.js"))),
                     noSlashRn(nol(c("lib/stubModules/main-built.js"))));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/155 no copy of paths
    doh.register("pathsNoCopy",
        [
            function pathsNoCopy(t) {
                file.deleteFile("lib/pathsNoCopy/js-built");

                build(["lib/pathsNoCopy/build.js"]);

                t.is(true, file.exists("lib/pathsNoCopy/js-built/vendor/sub.js"));
                t.is(false, file.exists("lib/pathsNoCopy/js-built/sub.js"));
                t.is(true, file.exists("lib/pathsNoCopy/js-built/outside.js"));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Confirm that deps: [] works in a build config file.
    doh.register("depsConfig",
        [
            function depsConfig(t) {
                file.deleteFile("lib/depsConfig/main-built.js");

                build(["lib/depsConfig/build.js"]);

                t.is(nol(c("lib/depsConfig/expected.js")),
                     nol(c("lib/depsConfig/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();


    //Tests https://github.com/jrburke/requirejs/issues/278, make sure that
    //baseUrl inside a mainConfigFile is resolved relative to the appDir in
    //a build file.
    doh.register("mainConfigBaseUrl",
        [
            function mainConfigBaseUrl(t) {
                build(["lib/mainConfigBaseUrl/build.js"]);

                t.is(nol(c("lib/mainConfigBaseUrl/expected.js")),
                     nol(c("lib/mainConfigBaseUrl/www-built/js/main.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Confirm package config builds correctly so that it works in both
    //require.js and almond, which does not know about package config.
    //https://github.com/jrburke/r.js/issues/136
    doh.register("packages",
        [
            function packages(t) {
                file.deleteFile("lib/packages/main-built.js");

                build(["lib/packages/build.js"]);

                t.is(nol(c("lib/packages/expected.js")),
                     nol(c("lib/packages/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Make sure pluginBuilder works.
    //https://github.com/jrburke/r.js/issues/175
    doh.register("pluginBuilder",
        [
            function pluginBuilder(t) {
                file.deleteFile("lib/pluginBuilder/main-built.js");

                build(["lib/pluginBuilder/build.js"]);

                t.is(nol(c("lib/pluginBuilder/expected.js")),
                     nol(c("lib/pluginBuilder/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Make sure a non-strict plugin does not blow up in the build
    //https://github.com/jrburke/r.js/issues/181
    doh.register("nonStrict",
        [
            function nonStrict(t) {
                file.deleteFile("lib/nonStrict/main-built.js");

                build(["lib/nonStrict/build.js"]);

                t.is(nol(c("lib/nonStrict/expected.js")),
                     nol(c("lib/nonStrict/main-built.js")));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests https://github.com/jrburke/r.js/issues/190,
    //optimizeAllPluginResources
    doh.register("optimizeAllPluginResources",
        [
            function optimizeAllPluginResources(t) {

                build(["lib/plugins/optimizeAllPluginResources/build.js"]);

                t.is(true, file.exists("lib/plugins/optimizeAllPluginResources/www-built/js/one.txt.js"));
                t.is(true, file.exists("lib/plugins/optimizeAllPluginResources/www-built/js/two.txt.js"));
                t.is(true, file.exists("lib/plugins/optimizeAllPluginResources/www-built/js/secondary.txt.js"));

                t.is(noSlashRn(nol(c("lib/plugins/optimizeAllPluginResources/expected-secondary.txt.js"))),
                     noSlashRn(nol(c("lib/plugins/optimizeAllPluginResources/www-built/js/secondary.txt.js"))));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests that under rhino paths are normalized to not have . or .. in them.
    //https://github.com/jrburke/r.js/issues/186
    doh.register("rhino186",
        [
            function rhino186(t) {
                build(["lib/rhino-186/app.build.js"]);

                t.is(noSlashRn(nol(c("lib/rhino-186/expected.js"))),
                     noSlashRn(nol(c("lib/rhino-186/built/main.js"))));

                require._buildReset();
            }

        ]
    );
    doh.run();

    //Tests cjsTranslate https://github.com/jrburke/r.js/issues/189
    doh.register("cjsTranslate",
        [
            function cjsTranslate(t) {

                build(["lib/cjsTranslate/www/app.build.js"]);

                var expected = nol(c("lib/cjsTranslate/expected.js")),
                    contents = nol(c("lib/cjsTranslate/www-built/js/lib.js"));

                t.is(expected, contents);

                require._buildReset();
            }

        ]
    );
    doh.run();

});
