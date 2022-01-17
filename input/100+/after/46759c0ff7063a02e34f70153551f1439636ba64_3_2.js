function() {
		// look for rcid in querystring; if not, we won't have a patrol token, so no point trying
		if (!QueryString.exists("rcid")) {
			return;
		}
		var rcid = QueryString.get("rcid");

		// extract patrol token from "Mark page as patrolled" link on page
		var patrollinkmatch = /token=(.+)%2B%5C$/.exec($(".patrollink a").attr("href"));
		if (patrollinkmatch) {
			var patroltoken = patrollinkmatch[1] + "+\\";
			var patrolstat = new Status("Marking page as patrolled");

			var wikipedia_api = new Wikipedia.api("doing...", {
				title: ctx.pageName,
				action: 'markpatrolled',
				rcid: rcid,
				token: patroltoken
			}, null, patrolstat);
			wikipedia_api.post({
				type: 'GET',
				url: mw.util.wikiScript('index'),
				datatype: 'text'  // we don't really care about the response
			});
		}
	}