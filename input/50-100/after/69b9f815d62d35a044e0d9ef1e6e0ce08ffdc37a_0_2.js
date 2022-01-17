function() {
			if (this.history.length > 0) {
                var that = this;
                $.asap(
                    function() {
                        var tmpEl = that.history.pop();
                        that.loadContent(tmpEl.target + "", 0, 1, tmpEl.transition);
                        that.transitionType = tmpEl.transition;
                        //for Android 4.0.x, we must touchLayer.hideAdressBar()
                    });
            }
        }