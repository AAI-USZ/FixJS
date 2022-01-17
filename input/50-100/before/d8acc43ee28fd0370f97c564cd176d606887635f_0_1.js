function(catagory) {
		catagory = parseInt(catagory);
		console.log(catagory);
		this.candidate_apps = _.clone(this.apps[catagory]);
		this.candidate_questions = _.shuffle(this.questions[catagory]);
		this.update_progress(0);
		this.next_question(true);
	}