function(/*String*/ fromViewId, /*String*/ toViewId, /*Object*/args){
			this.transitionInfo[fromViewId.replace(/^#/, "") + ":" + toViewId.replace(/^#/, "")] = args;
		}