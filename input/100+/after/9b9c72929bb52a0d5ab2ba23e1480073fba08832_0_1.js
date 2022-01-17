function ($routeProvider, $provide) {
	$provide.factory('appSettings', function () {
		var e = angular.element(".gridsmodule");
		console.log("app",e)

		var settings = {
			Name: e.data("application-name"),
			Id: e.data("application-id")
		};
		return settings;
	});
	$provide.constant()

	$routeProvider
		.when('/list', { controller: GridListController, templateUrl: 'template/list' })
		.when('/gridpage/:Id', { controller: GridPageCtrl, templateUrl: 'template/gridpage' })
		.when('/gridpage/:Id/edit/:GridElementId', { controller: EditCtrl, template: 'template/edit' })
		.otherwise({ redirectTo: '/list' });
}