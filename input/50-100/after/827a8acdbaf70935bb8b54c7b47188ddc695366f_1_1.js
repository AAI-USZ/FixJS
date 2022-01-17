function(dbname) {
		new Request.JSON({
			'url': '/ajax/call/arkeogis/getDbDesc',
			'onSuccess': function(resJSON) {
				mydir.displayDesc(dbname,resJSON);
			}
		}).get({'dbname': dbname});


	}