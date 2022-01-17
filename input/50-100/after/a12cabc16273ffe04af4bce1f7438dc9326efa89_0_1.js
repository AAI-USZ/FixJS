function() {
			if (this.whichView === "hintable") {
				this.containerHintable.classList.remove("hideme");
				this.containerPropvals.classList.add("hideme");
				this.myHintable.start();
			} else {
				this.containerHintable.classList.add("hideme");
				this.containerPropvals.classList.remove("hideme");
				this._showTweener();
			}
		}