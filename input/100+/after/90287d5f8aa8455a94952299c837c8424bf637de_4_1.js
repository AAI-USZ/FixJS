function() {

			var app = namespace.app;
			var listView;


			beforeEach(function() {
				listView = new TorrentsListView({
					collection: app.torrents
				});
				listView.render();
			});

			var verifyLengthComparedToCollection = function() {
				var lis = $(listView.el).find(".torrentInfo");
				expect(lis.length).toEqual(sampleData.length);
			};

			it("has a method render", function() {
				expect(typeof(listView.render)).toEqual("function");
			});

			it("has a list of the same length as the model data", function() {
				verifyLengthComparedToCollection();
			});

			it("empties the list when the collection is emptied", function() {
				sampleData.length = 0;
				app.torrents.fetch();
				verifyLengthComparedToCollection();
			});

			it("removes a listItem when the collection shrinks", function() {
				sampleData.pop();
				app.torrents.fetch();
				verifyLengthComparedToCollection();
			});

			afterEach(function() {
				listView.close();
			});


		}