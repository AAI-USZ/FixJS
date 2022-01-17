function (doc, filter) {
        this.document = doc || document;
        this._env = jasmine.getEnv();
        this.params = new UrlParams();
        this.params.parse();
        
        // parse querystring
        var self = this,
            i,
            p;
        
        this._runAll = this.params.get("spec") === "All";
        
        // _topLevelFilter is applied first - selects Performance vs. Unit test suites
        this._topLevelFilter = filter;
        
        // Jasmine's runner uses the specFilter to choose which tests to run.
        // If you selected an option other than "All" this will be a subset of all tests loaded.
        this._env.specFilter = this.createSpecFilter(this.params.get("spec"));
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