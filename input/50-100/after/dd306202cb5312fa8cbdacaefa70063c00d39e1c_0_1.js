function(x) {
        // skip files starting with _ and only test *.js files
        if (/[\/\\]_/.test(x.name) || ! /\.js$/.test(x.name ) ) {
            print(" >>>>>>>>>>>>>>> skipping " + x.name);
            return;
        }

        /* load the test documents */
        load('jstests/aggregation/data/articles.js');

        print(" *******************************************");
        print("         Test : " + x.name + " ...");
        print("                " + Date.timeFunc(function(){ load(x.name); }, 1) + "ms");
    }