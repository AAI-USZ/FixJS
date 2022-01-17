function JMEFunction(q,data) {
        this.name = ko.observable('');
        this.types = ['number','string','boolean','vector','matrix','list','name','function','op','range','?'];
        this.parameters = ko.observableArray([])
        this.type = ko.observable('number');
        this.definition = ko.observable('');
		this.languages = ['jme','javascript'];
        this.language = ko.observable('jme');

        this.remove = function() {
            q.functions.remove(this);
        };
		if(data)
			this.load(data);
    }