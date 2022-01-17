function(aRelativePath) {

		// we retrieve the nsIFile object (profile directory of the user)

		var file = Components.classes["@mozilla.org/file/directory_service;1"]

						  .getService(Components.interfaces.nsIProperties)

						  .get("ProfD", Components.interfaces.nsIFile);

		// we add the relative path given

		var path = aRelativePath.split("/");

		for (var i = 0, sz = path.length; i < sz; i++) {

			if (path[i] != "")

				file.append(path[i]);

		}

		return file.path;

	}