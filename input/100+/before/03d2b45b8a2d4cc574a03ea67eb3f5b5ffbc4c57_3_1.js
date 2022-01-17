function (doc, filter) {
        this._paramMap = {};
        this.document = doc || document;
        this._env = jasmine.getEnv();
        
        // parse querystring
        var self = this,
            params = this.document.location.search.substring(1).split('&'),
            i,
            p;
        
        for (i = 0; i < params.length; i++) {
            p = params[i].split('=');
            this._paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        }
        
        this._runAll = this._paramMap.spec === "All";
        
        // _topLevelFilter is applied first - selects Performance vs. Unit test suites
        this._topLevelFilter = filter;
        
        // Jasmine's runner uses the specFilter to choose which tests to run.
        // If you selected an option other than "All" this will be a subset of all tests loaded.
        this._env.specFilter = this.createSpecFilter(this._paramMap.spec);
        this._runner = this._env.currentRunner();
        
        // build DOM immediately
        var container = $(
            '<div class="container-fluid">' +
                '<div class="row-fluid">' +
                    '<div class="span4">' +
                        '<ul id="suite-list" class="nav nav-pills nav-stacked">' +
                        '</ul>' +
                    '</div>' +
                    '<div id="results-container" class="span8">' +
                    '</div>' +
                '</div>' +
                '</div>'
        );
        
        $(this.document.body).append(container);
        
        this._topLevelSuiteMap = {};
        this.$suiteList = $("#suite-list");
        this.$resultsContainer = $("#results-container");
    }