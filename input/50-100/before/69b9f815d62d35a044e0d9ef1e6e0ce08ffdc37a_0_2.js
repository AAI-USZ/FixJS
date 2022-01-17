function() {
			if (this.history.length > 0) {
                var tmpEl = this.history.pop();
                this.loadContent(tmpEl.target + "", 0, 1, tmpEl.transition);
                this.transitionType = tmpEl.transition;
				//for Android 4.0.x, we must touchLayer.hideAdressBar()
            }
        }