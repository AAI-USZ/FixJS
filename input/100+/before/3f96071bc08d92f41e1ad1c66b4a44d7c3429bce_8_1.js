function(json) {
        if (json) {
            this.store(json);
        }
        this.displayQuestions();
        if (this.more_results_url) {
        	pl('#addqandabox').before('<div class="showmore hoverlink" id="moreresults"><span class="initialhidden" id="moreresultsurl">' + this.more_results_url + '</span><span id="moreresultsmsg">More...</span></div>\n');
        }
        if (this.loggedin_profile_id && this.loggedin_profile_id !== this.listing_owner_id) {
            this.displayAddQuestionBox();
        }
        else if (this.loggedin_profile_id && this.loggedin_profile_id === this.listing_owner_id) {
            pl('#addqandabox').before('<div class="messageline"><p style="font-weight: bold;">Questions are private until answered, then they are displayed pubilcly</p></div>');
        }
        else {
            pl('#addqandabox').before('<div class="messageline"><p style="font-weight: bold;">Login to ask a question</p></div>');
        }
        pl('#qandaswrapper').show();
        if (this.more_results_url) {
            this.bindMoreResults();
        }
    }