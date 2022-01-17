function(duration) {
    	if (duration == null) {
    		duration = "";
    	}
    	if (displObj != null) {
	    	displObj.domNode.style.MozAnimation = "";
	    	displObj.domNode.style.WebkitAnimation = "";
	    	displObj.domNode.style.Animation = "";
    	}
    	for (var i=0; i < this.animationList.length; i++) {
    		var displObj = this.animationList[i].displObj;
    		var animName = this.animationList[i].animName;
    		var animTime = this.animationList[i].animTime;
    		displObj.domNode.style.MozAnimation = animName + " " + animTime + "s linear " + duration;
	        displObj.domNode.style.WebkitAnimation = animName + " " + animTime + "s linear " + duration;
	        displObj.domNode.style.Animation = animName + " " + animTime + "s linear " + duration;
    	}
    	
    }