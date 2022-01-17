function(base, workspaceOnly, flushCache){

	

	if (flushCache) {

		delete _themesCache[base];

	}

	

	function result(){

		/* filters out workspace/non workspace values  before returning them.  always caches ALL themes */

		var rlt = [];

		if(_themesCache[base]){

			rlt = workspaceOnly ?

				_themesCache[base].filter(function(entry) { return !entry.file.isVirtual(); })

				: _themesCache[base];

		}

		return rlt;

	}



	if(_themesCache[base]) {

		return result();

	}



	var prefs = Preferences.getPreferences('davinci.ui.ProjectPrefs', base),

		projectThemeBase = new Path(base).append(prefs.themeFolder),

		allThemes = system.resource.findResource("*.theme", false, projectThemeBase.toString());



	_themesCache[base] = allThemes.map(function(theme) {

		var t = JSON.parse(theme.getContentSync());

		t.file = theme;

		return t;

	});



	return result();

}