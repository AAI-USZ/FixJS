function(oldDiv, currDiv) {
            oldDiv.style.display = 'none';
            this.doingTransition = false;
			if(currDiv) this.clearAnimations(currDiv);
        }