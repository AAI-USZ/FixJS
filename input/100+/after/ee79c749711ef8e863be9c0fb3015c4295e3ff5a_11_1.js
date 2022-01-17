function(moduleContext) {

		var self = this;

		

		this.init = function(){

			$.getJSON(moduleContext.getSettings().items().urls.salesPersonInfo, function (result) {

				self.salesPersons(result);

            });

		};

			

		this.salesPersons = ko.observableArray();

		this.personClicked = function(person){

			moduleContext.getController().goTo("salespersons/"+person.id);

		};

		this.moduleEnabled = ko.observable(true);

		

		

		this.init();	//call the initialization method.. is this the best way?

	}