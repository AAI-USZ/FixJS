function () {
		var e = angular.element(".gridsmodule");
		console.log("app",e)

		var settings = {
			Name: e.data("application-name"),
			Id: e.data("application-id")
		};
		return settings;
	}