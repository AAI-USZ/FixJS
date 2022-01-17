function(entries) {
		console.log(entries.length+' files in local store');
		for (var i=0; i<entries.length; ++i) {
			var f = GFS.Elements.createFile(entries[i].fullPath, entries[i]);
			f.displayAsLink($(Constants.Selectors.DOWNLOADING_LIST)[0]);
		}
	}