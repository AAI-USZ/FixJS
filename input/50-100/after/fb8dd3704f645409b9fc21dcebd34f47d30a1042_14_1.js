function() {
				this._contentContainer = dom.create("div", {
					className: "TiUIProgressBarContainer",
					style: {
						pointerEvents: "none",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						position: "absolute",
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