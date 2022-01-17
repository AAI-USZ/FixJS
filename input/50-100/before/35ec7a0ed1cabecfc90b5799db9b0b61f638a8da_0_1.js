function(roundDto, answers) {
        var self = this;

		self.questionText = ko.observable();
		self.score = ko.observable();
		
		//hydrate from dto
		ko.mapping.fromJS(roundDto, {}, self);

		self.answers = ko.observableArray(answers);
	}