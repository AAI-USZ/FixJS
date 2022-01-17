function( URL ) {
			Console.log("Getting entry by URL for '" + URL + "'");
			var uid = this.getUID(  ), c = this;
			ce.fireEvent ( domain.COMIC_FETCH_INPROGRESS, {uid: uid, comic: c, url: URL});

			var values = {
				URL: URL,
				xpath: this.params.xpath,
				context: {
					URL: URL,
					comic: c
				}
			}
			
			domain.YQLHelper.fetchYQL( this.yqlQuery, values, this.callback );

			return uid
		}