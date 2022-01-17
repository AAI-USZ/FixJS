function AnimEn() {
	
    	this.domNode;
    	this.canvasNode;
    	
    	this.gameLoopId;
    	this.activeScene = "defaultAnim";
    	
    	this.fps = 30;
    	
    	this.stage;
    	
    	this.selectedObject;
    	
    	this.animationMode;
    	
    	this.animObjs = [];
    	
    	this.animationNode = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(this.animationNode);
    	
    	this.scenes = {};
	
	}