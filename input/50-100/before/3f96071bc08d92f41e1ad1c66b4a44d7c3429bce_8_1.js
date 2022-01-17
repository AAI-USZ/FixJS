function(json) {
        this.questionlist = json.questions_answers || [];
        this.more_results_url = this.questionlist.length > 0 && json.questions_answers_props && json.questions_answers_props.more_results_url;
    }