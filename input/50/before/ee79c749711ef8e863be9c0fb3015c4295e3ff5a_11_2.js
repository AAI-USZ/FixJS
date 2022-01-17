function(){

			$.getJSON(moduleContext.getSettings().urls.salesPersonInfo, function (result) {

				self.salesPersons(result);

            });

		}