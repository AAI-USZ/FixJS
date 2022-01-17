function(id, zIndex, file){
	//Contains the first statement in a dialogue, this will start off the conversation
	this.activeStatement = null;
	this.nextActiveStatement = null;
	this.previousActiveStatement = null;
	this.originalActive = null; //Track the original active so it can be reset on exit
	this.file = file; //url of the xml file with relevant dialogue
	this.set_check = []; //object to contain the set & check conversation values
	this.keyValue = false;
	//These strings contain the HTML values to reuse when the active Statement isn't relevant
	this.overseerHTML = '';
	this.playerHTML = '';
	this.popupHTML = '';
	this.statements = []; //array of all statements
	
	this.overseerCSS = {
		top: '5px',
		left: '5px',
	}
	
	this.playerCSS = {
		top: $('#origins').height() - parseInt(helper.findCSSRule('.speech').style.height) - 15 + 'px',
		left: 5 + 'px',
	}
	
	this.responseHolders = [];
	for (var i=0; i < 4; i++) {
		this.responseHolders.push({
			height: Math.floor(parseInt(helper.findCSSRule('.speech').style.height) / 4) + 'px',
			width: helper.findCSSRule('.speech').style.width,
		});
		//This needs to be setup out here so that it can access the height variable
		this.responseHolders[i].top = parseInt(this.responseHolders[i].height) * i + 'px';
	};
	
	this.popupCSS = {
		width: $('#origins').width() / 5 + 'px',
		height: $('#origins').height() / 4 + 'px',
	}
	this.popupCSS.top = ($('#origins').height() - parseInt(this.popupCSS.height)) / 2 + 'px';
	this.popupCSS.left = ($('#origins').width() - parseInt(this.popupCSS.width)) / 2 + 'px';
}