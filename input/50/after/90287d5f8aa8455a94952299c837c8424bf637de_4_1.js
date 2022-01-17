function() {
				var lis = $(listView.el).find(".torrentInfo");
				expect(lis.length).toEqual(sampleData.length);
			}