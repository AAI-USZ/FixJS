function(App, namespace, $, _) {

		App.initialize();

		n = namespace;

		var setupFakeHttp = function() {
			/* Global variable that gets reset before every test*/
			sampleData = [{
				id: "1234",
				name: "Some.Movie",
				sizeInBytes: 1025,
				fileNames:["movie.avi", "sample.avi"]
			},

			{
				id: "2345",
				name: "Good.Movie",
				sizeInBytes: 1023,
				fileNames:["film.avi", "sample.mkv"]
			}];

			registerFakeAjax({
				url : "api/torrents",
				successData : sampleData,
			});
		};
		beforeEach(function() {
			setupFakeHttp();
			namespace.app.torrents.fetch();
			namespace.app.router.navigate("");
		});
	}