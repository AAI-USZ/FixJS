function(Settings) {



	return function(id) {

		

		var self = this;

		//Binding variables in view with blank obeservables

		this.pId = ko.observable();

		this.firstName = ko.observable();

		this.lastName = ko.observable();

		this.averageSales = ko.observable();



		this.initialize = function(id) {

			//Getting data from JSON objects

			$.getJSON(Settings.urls.dumSvr + id + ".json", function(data) {



				self.pId(data.id);

				self.firstName(data.firstName);

				self.lastName(data.lastName);

				self.averageSales(data.averageSales);

			});

		}



		this.initialize(id);

		

		this.moduleEnabled = ko.observable(true);



	};

}