function(answers)
	{
        var self = this;


        this.wrapper.empty();
        this.answers = answers || [];
        this.answersOptions = new Elements();

        var val = {value: this.element.get('value').clean()};

        this.answers.each(function(option, index)
		{
            	self.addOption(option, val, index);
        })
    }