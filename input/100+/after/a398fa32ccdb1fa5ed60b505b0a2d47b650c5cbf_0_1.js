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

	

		_themesCache[base] = [];

		for (var i = 0; i < allThemes.length; i++){

			if (allThemes[i]){

				var t = JSON.parse(allThemes[i].getContentSync());

				t.file = allThemes[i];

				_themesCache[base].push(t);

			} else {

				// FIXME: for some reason findResource can return an null in the themes.  

				// but until the root cause of #2635 is found we will play it safe

				console.error('library.getThemes: undefined theme returned by system.resource.findResource("*.theme", false, projectThemeBase.toString());');

			}

		}



	/*_themesCache[base] = allThemes.map(function(theme) {

		if (theme){

			var t = JSON.parse(theme.getContentSync());

			t.file = theme;

			return t;

		} else {

			console.error('library.getThemes: undefined theme returned by system.resource.findResource("*.theme", false, projectThemeBase.toString());');

		}

	});

*/

	return result();

}