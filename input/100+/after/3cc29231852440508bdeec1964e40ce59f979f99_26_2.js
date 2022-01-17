function(event) {
            event.stopPropagation();

            /* Un-highlight the old choice and highlight the new choice */
    		this.application.ninja.timeline.easingMenu.popup.contentEl.querySelector(".easing-selected").classList.remove("easing-selected");
    		event.target.classList.add("easing-selected");
    		
    		/* Set the easing */
    		this.easing = event.target.dataset.ninjaEase;
            this.parentTween.easing = this.easing;
            this.parentTween.tweenData.easing = this.easing;
    		
    		this.application.ninja.timeline.easingMenu.popup.contentEl.removeEventListener("click");
    		this.hideEasingMenu();
    	}