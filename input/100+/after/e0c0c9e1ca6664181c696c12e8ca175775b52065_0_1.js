function(fileNameLabel, createLabel, type, dialogSpecificClass, fileName, existingResource) {

	var resource=existingResource || getSelectedResource();

	var folder;

	if (resource) {

		if(resource.elementType=="Folder"){

			folder = resource;

		}else{

			folder = resource.parent;

		}

	}else{

		var base = Workbench.getProject();

		var prefs = Preferences.getPreferences('davinci.ui.ProjectPrefs',base);

		

		if(prefs.webContentFolder!=null && prefs.webContentFolder!=""){

			var fullPath = new Path(Workbench.getProject()).append(prefs.webContentFolder);

			folder = Resource.findResource(fullPath.toString());

			

		}else{

			folder= Resource.findResource(Workbench.getProject());

		}

	}

	

	var proposedFileName = fileName || uiResource.getNewFileName('file',folder,"." + type);

	var dialogOptions = {newFileName:proposedFileName,

						fileFieldLabel:fileNameLabel, 

						folderFieldLabel:"Where:", // FIXME: i18n

						finishButtonLabel:createLabel,

						value: folder,

						checkFileName: checkFileName,

						dialogSpecificClass:dialogSpecificClass};

	return new NewFile(dialogOptions);

}