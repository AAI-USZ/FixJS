function(event) {
            event.stopPropagation();

            // Remove the pointer to ourselves
            //this.application.ninja.timeline.currentOpenSpanMenu = false;

            // Un-highlight the old choice and highlight the new choice
            this.application.ninja.timeline.easingMenu.popup.contentEl.querySelector(".easing-selected").classList.remove("easing-selected");
            event.target.classList.add("easing-selected");

            // Set the easing
            this.easing = event.target.dataset.ninjaEase;
            this.parentComponent.easing = this.easing;
            this.parentComponent.tweenData.easing = this.easing;

            // Unbind the event handler
            this.application.ninja.timeline.easingMenu.popup.contentEl.removeEventListener("click");

            // Hide the menu.
            this.hideEasingMenu();
        }