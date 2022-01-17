function() {
			var prongs = this._prongs = [],
				i = 0,
				contentContainer = this._contentContainer = UI.createView({
					layout: "horizontal",
					width: UI.SIZE,
					height: UI.SIZE
				});
			contentContainer._layout._defaultVerticalAlignment = "center";
			this._add(contentContainer);
			contentContainer.hide();
				
			contentContainer._add(this._indicatorIndicator = UI.createView({
				width: 36,
				height: 36
			}));
				
			contentContainer._add(this._indicatorMessage = UI.createLabel());

			for (; i < 12; i++) {
				prongs.push(dom.create("div", {
					className: "TiUIActivityIndicatorProng",
					style: {
						transform: "translate(16px,0px) rotate(" + i * 30 + "deg)",
						transformOrigin: "2px 18px",
						opacity: opacity
					}
				}, this._indicatorIndicator.domNode));
			}
		}