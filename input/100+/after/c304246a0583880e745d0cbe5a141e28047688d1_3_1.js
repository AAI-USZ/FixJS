function GraphCollection(){
	this.data = {};
	this.worksheets = {};
	
	this.graphs = [];
	this.selectedGraphIndex = 0;
	this.datasetsMenuShowing = false;
	this.datasetsVisible = {};
	
	//Drawing Variables
	this.w = this.calcGraphWidth();
	this.h = this.calcGraphHeight();
	this.padBot = 0;
	this.padTop = 32;
	this.padLeft = 35;
	this.padRight = 25;
	this.defaultGraphHeight = 300;
	this.labelTextSize = "16";
	this.tickTextSize = "12";
	this.buckets = 30;
	this.bucketDotSize = 5;
	this.numberOfCategories = 0;
	
	//Colors
	this.categoryColors = {};
	this.colorScale = pv.Colors.category20(0,20);
	
	this.numberOfAddedCategories = this.numberOfCategories;
	
	//Used to draw edited category titles in red
	this.editedCategories = {};

	//Increments a value added to end of default labels
	this.nextDefaultLabel = {};

	//Mode flags
	this.editModeEnabled = false;
	this.advancedUser = false;
	this.buttonIcon = true;
	this.buttonText = true;
	
	//for highlighting points with the same label
	this.selectedLabel = null;
	
	//Add an empty graph and initialize menu
	this.addGraph();
	this.updateMenuOptions();
	
	this.nextSampleSetNumber = 0;
	this.nextResampleSetNumber = 0;
	
	this.resamplingEnabled = false;
	
	this.bwMode = false;
	this.lineMode = false;
	
	this.nextDefaultCategoryNumber = 0;
}