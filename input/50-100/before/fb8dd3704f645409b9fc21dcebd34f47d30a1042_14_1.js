function() {
				this._contentContainer = dom.create("div", {
					className: "TiUIProgressBarContainer",
					style: {
						pointerEvents: "none",
						width: "100%",
						height: "100%",
						overflow: "hidden"
					}
				}, this.domNode);
				this._indicator = dom.create("div", {
					className: "TiUIProgressBarIndicator",
					style: {
						pointerEvents: "none",
						width: "0%",
						height: "100%"
					}
				}, this._contentContainer);
			}