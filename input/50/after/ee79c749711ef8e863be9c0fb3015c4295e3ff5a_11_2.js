function(){

			$.getJSON(moduleContext.getSettings().items().urls.salesPersonInfo, function (result) {

				self.salesPersons(result);

            });

		}