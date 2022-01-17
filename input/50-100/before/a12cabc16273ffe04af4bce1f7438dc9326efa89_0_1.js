function() {
			if (this.whichView === "hintable") {
				this.containerHintable.classList.remove("hidden");
				this.containerPropvals.classList.add("hidden");
				this.myHintable.start();
			} else {
				this.containerHintable.classList.add("hidden");
				this.containerPropvals.classList.remove("hidden");
				this._showTweener();
			}
		}