function(question) 
	{
		if(question.exam.loading)
			return;

		var id = this.getQuestionId(question);

		if(!(id in this.questionIndices))
			return;

		var index = this.questionIndices[id];


		var prepath = 'objectives.'+index+'.';

		this.set(prepath+'score.raw',question.score);
		this.set(prepath+'score.scaled',question.score/question.marks || 0);
		this.set(prepath+'success_status', question.score==question.marks ? 'passed' : 'failed' );
		this.set(prepath+'completion_status', question.answered ? 'completed' : 'incomplete' );
	}