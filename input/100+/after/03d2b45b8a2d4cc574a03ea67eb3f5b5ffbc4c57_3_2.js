function (runner) {
        var specs = runner.specs(),
            topLevelData,
            self = this;
    
        // create top level suite list navigation
        this._createSuiteList();
        
        // highlight the current suite
        topLevelData = (this.params.get("spec")) ? this._topLevelSuiteMap[this.params.get("spec")] : null;
        
        if (topLevelData) {
            topLevelData.$listItem.toggleClass("active", true);
        }
        
        this._specCount = 0;
        this._specCompleteCount = 0;
        
        specs.forEach(function (spec, index) {
            if (self._env.specFilter(spec)) {
                self._specCount++;
            }
        });
        
        if (this._specCount) {
            this._showProgressBar();
        
            // display current running test
            this.$info = $('<div class="alert alert-info"/>');
            this.$resultsContainer.append(this.$info);
            this.$resultsContainer.append($('<hr/>'));
        }
    }