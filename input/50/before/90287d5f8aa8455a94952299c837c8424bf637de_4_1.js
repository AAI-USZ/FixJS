function() {
				var lis = $(listView.el).find("li");
				expect(lis.length).toEqual(sampleData.length);
			}