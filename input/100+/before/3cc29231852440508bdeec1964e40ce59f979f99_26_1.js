function(){
            this.element.style.width = this.spanWidth + "px";

            if ((this.spanWidth <= 70) && (this.spanWidth >0)) {
                var containerWidth = this.spanWidth -18,
                    choiceWidth;
                if (containerWidth < 0) {
                    containerWidth = 0;
                }
                choiceWidth = containerWidth -3;
                if (choiceWidth < 0) {
                    choiceWidth = 0;
                }
                this.container_easing.style.width = containerWidth + "px";
                this.easing_choice.style.width = choiceWidth + "px";
                this.easing_choice.style.overflow = "hidden";
            }
            if (this.spanWidth > 70) {
                this.container_easing.setAttribute("style", "");
                this.easing_choice.setAttribute("style", "");
            }

            // Highlight the span?
            if (this.isHighlighted === true) {
                this.element.classList.add("spanHighlight");
            } else {
                this.element.classList.remove("spanHighlight");
            }

            /*
            // Hide or show the choices menu?
            if (this.areChoicesVisible === true) {
                this.easing_choices.style.display = "block";
            } else {
                this.easing_choices.style.display = "none";
            }
            */

            // Change easing?
            if (this.easing_choice.innerText !== this.easing) {
                this.easing_choice.innerText = this.easing;
            }

        }