function(){
			var newProjectName = dojo.attr(this._projectName, "value");
			var isEclipse = dojo.attr(this._eclipseSupport,'checked');

			Resource.createProject(newProjectName, true, isEclipse);
			
			if(isEclipse){
				var prefValue = {webContentFolder:"./WebContent", themeFolder: "./WebContent/themes", widgetFolder: "./WebContent/widgets"};
				Preferences.savePreferences('davinci.ui.ProjectPrefs',newProjectName, prefValue);
			}
			
			if(Workbench.singleProjectMode())
				Workbench.loadProject(newProjectName);
			
			this.onClose();
		}