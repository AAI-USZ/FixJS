function sync() {
		if (optionsGetB("Enable Sync"))	{
			$jq.ajax({
				headers: {"X-Requested-With":"Ajax"},
				dataType: "json",
				url: 'http://nassign.heliohost.org/s/qp.php?t='+t,
				cache: false
			}).fail(function() {
				setSyncStatus(1, "Offline (Error retrieving)");
			}).done(function(data) {
				if (data == null) {
					setSyncStatus(0, "Online");
				} else {
					onlineNames = [];
					onlinePosts = [];
					onlineSubjects = [];
					onlineEmails = [];
					
					for (var i = 0, len = data.length; i < len; i++) {
						onlineNames.push(data[i].n);
						onlinePosts.push(data[i].p);
						onlineEmails.push(data[i].e);
						onlineSubjects.push(data[i].s);
					}

					setSyncStatus(0, "Online");
					updateElements();
				}
			});
		} else {
			setSyncStatus(2, "Disabled");
		}
		
		if (canSync()) {
			setTimeout(function() { sync(); }, 30000);
		}
	}