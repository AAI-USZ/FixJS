function () {
		var e = angular.element(".gridsmodule"); ;
		var settings = {
			Name: e.data("application-name"),
			Id: e.data("application-id")
		};
		return settings;
	}