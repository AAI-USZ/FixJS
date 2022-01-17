function () {

        var b = browserify({debug: true}),

            middleware = require("rewire").browserify,

            browserOutput = __dirname + "/browserify/bundle.js",

            browserBundle,

            vmBundle;



        b.use(middleware);

        b.addEntry(__dirname + "/testModules/sharedTestCases.js");

        vmBundle = b.bundle();

        browserBundle = vmBundle;



        // Setup for mocha

        browserBundle = "function enableTests() {" + browserBundle + "}";



            /*

        vmBundle += 'window.browserifyRequire("/test/testModules/sharedTestCases.js");'; */



        // Output for browser-testing

        fs.writeFileSync(browserOutput, browserBundle, "utf8");



        // This should throw no exception.

        runInFakeBrowserContext(vmBundle, browserOutput);

    }