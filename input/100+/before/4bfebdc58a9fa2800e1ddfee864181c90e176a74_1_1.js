function(scene) {
    	for (var i=0; i < this.animationList.length; i++) {
    		var displObj = this.animationList[i].displObj;
    		var animName = this.animationList[i].animName;
    		var animTime = this.animationList[i].animTime;
    		displObj.domNode.style.MozAnimation = animName + " " + animTime + "s linear infinite";
	        displObj.domNode.style.WebkitAnimation = animName + " " + animTime + "s linear infinite";
	        displObj.domNode.style.Animation = animName + " " + animTime + "s linear infinite";
    	}
    	
    }