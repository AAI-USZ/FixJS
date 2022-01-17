function(){
	if(this.cleanMode){
		this.retrieveMetaData();
		this.retrieveProjectRunStatus();
		eventManager.fire('cleanProject');
	} else {
		//make the top project authoring container visible (where project title shows up)
		$('#currentProjectContainer').show();
		
		//make the bottom project authoring container visible (where the steps show up)
		$('#authoringContainer').show();
		$('#projectTools').show();
		
		this.projectStructureViolation = false;
		if(this.selectModeEngaged){
			this.disengageSelectMode(-1);
		};
	
		/*if(this.project && this.project.useAutoStep()==true){
			document.getElementById('autoStepCheck1').checked = true;
		} else {
			document.getElementById('autoStepCheck1').checked = false;
		};*/
	
		if(this.project && this.project.useStepLevelNumbering()==true){
			//document.getElementById('stepLevel').checked = true;
			document.getElementById('numberStepSelect').options[1].selected = true;
		} else {
			//document.getElementById('stepLevel').checked = false;
			document.getElementById('numberStepSelect').options[0].selected = true;
		};
	
		if(this.project && this.project.getStepTerm()){
			document.getElementById('stepTerm').value = this.project.getStepTerm();
		} else {
			document.getElementById('stepTerm').value = '';
			this.project.setStepTerm('');
			this.notificationManager.notify('stepTerm not set in project, setting default value: \"\"', 2);
		};
	
		document.getElementById('postLevelSelect').selectedIndex = 0;
	
		// if we're in portal mode, tell the portal that we've opened this project
		if (this.portalUrl) {
			this.notifyPortalOpenProject(this.project.getContentBase(), this.project.getProjectFilename());
		}
	
		if(this.project.getTitle()){
			var title = this.project.getTitle();
		} else {
			var title = this.project.getProjectFilename().substring(0, this.project.getProjectFilename().lastIndexOf('.project.json'));
			this.project.setTitle(title);
		};

		document.getElementById('projectTitleInput').value = title;

		//set the project id so it is displayed to the author
		$('#projectIdDisplay').text(this.portalProjectId);
		
		this.populateThemes();
	
		this.generateAuthoring();
	
		this.retrieveMetaData();
		
		this.retrieveProjectRunStatus();
		
		//add these two params to the config
		this.getConfig().setConfigParam('getContentUrl', this.getProject().getUrl());
		this.getConfig().setConfigParam('getContentBaseUrl', this.getProject().getContentBase());
	
		if(this.placeNode){
			this.placeNewNode(this.placeNodeId);
		}
		
		this.notificationManager.notify("Loaded Project ID: " + this.portalProjectId, 3);
	}
}