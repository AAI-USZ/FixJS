function (eventDetail) {
        	if (eventDetail.source === "SelectionTool" || eventDetail.source === "timeline" || eventDetail.source === "pi" || eventDetail.source === "cssPanelChange") {
	            if(this.parentComponent.parentComponent.animatedElement.offsetTop != this.tweenedProperties["top"]){
	                this.tweenedProperties["top"] = this.parentComponent.parentComponent.animatedElement.offsetTop + "px";
	            }
	            if(this.parentComponent.parentComponent.animatedElement.offsetLeft != this.tweenedProperties["left"]){
	                this.tweenedProperties["left"] = this.parentComponent.parentComponent.animatedElement.offsetLeft + "px";
	            }
	            if (this.parentComponent.parentComponent.animatedElement.offsetWidth != this.tweenedProperties["width"]){
	                this.tweenedProperties["width"] = this.parentComponent.parentComponent.animatedElement.offsetWidth + "px";
	            }
	            if (this.parentComponent.parentComponent.animatedElement.offsetHeight != this.tweenedProperties["height"]){
	                this.tweenedProperties["height"] = this.parentComponent.parentComponent.animatedElement.offsetHeight + "px";
	            }

	            this.parentComponent.parentComponent.updateKeyframeRule();
	            this.isTweenAnimated = true;
        	}

            if(!this.parentComponent.parentComponent.enabled3D){
                this.parentComponent.parentComponent.initial3DforAllTweens();
            }
			
			if (eventDetail.source === "translateTool" || eventDetail.source === "rotateTool") {
        		var arrMat = eventDetail.data.value[0].properties.mat,
        			strTweenProperty = "perspective(1400) matrix3d(" + arrMat.join() + ")";
        		
        		this.tweenedProperties["-webkit-transform"] = strTweenProperty;
        		this.parentComponent.parentComponent.updateKeyframeRule();
        		this.isTweenAnimated = true;
        	}
        }