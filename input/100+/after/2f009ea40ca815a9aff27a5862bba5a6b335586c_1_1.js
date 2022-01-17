function(){
            if(this.isSelected){
                return;
            }
            if(this.parentComponent.parentComponent.parentComponent.trackType == "position"){
                var tweenID = this.parentComponent.tweenID;
                var mainTrack = this.parentComponent.parentComponent.parentComponent.parentComponent.parentComponent.parentComponent.parentComponent;
                mainTrack.childComponents[0].childComponents[tweenID].childComponents[0].selectKeyframe();
                return;
            }
            this.isSelected=true;
            //this.element.style.left = (this.position - 6) + "px"; Moved to draw cycle.
            this.application.ninja.timeline.selectedStyle = this.parentComponent.parentComponent.parentComponent.trackEditorProperty;
            this.parentComponent.selectTween();
        }