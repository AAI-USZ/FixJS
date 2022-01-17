function () {
        	this.tweenspan.element.style.width = this.spanWidth + "px";
            this.keyframe.element.style.left = (this.spanWidth -5) + "px";
            this.tweenspan.spanWidth = this.spanWidth;
            this.element.style.left = this.spanPosition + "px";
            this.keyframe.position = this.spanWidth;
            this.tweenspan.easing = this.easing;
            if(this.isTweenAnimated){
                this.tweenspan.highlightSpan();
            }
        }