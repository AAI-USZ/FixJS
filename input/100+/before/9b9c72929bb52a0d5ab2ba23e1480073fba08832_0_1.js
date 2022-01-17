function ($routeProvider, $provide) {
	$provide.factory('appSettings', function () {
		var e = angular.element(".gridsmodule"); ;
		var settings = {
			Name: e.data("application-name"),
			Id: e.data("application-id")
		};
		return settings;
	});
	$routeProvider
		.when('/list', { controller: GridListController, templateUrl: 'template/list' })
		.when('/gridpage/:Id', { controller: GridPageCtrl, templateUrl: 'template/gridpage' })
		.when('/gridpage/:Id/edit/:GridElementId', { controller: EditCtrl, template: 'template/edit' })
		.otherwise({ redirectTo: '/list' });
}