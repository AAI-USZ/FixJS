function(newIndex, hidePagingControl) {
			this._pagingControlContentContainer._removeAllChildren();
			var diameter = this.pagingControlHeight / 2;
			for (var i = 0; i < this.views.length; i++) {
				var indicator = UI.createView({
					width: diameter,
					height: diameter,
					top: diameter / 2,
					left: i * 2 * diameter,
					backgroundColor: i === newIndex ? "white" : "grey"
				});
				setStyle(indicator.domNode,"borderRadius",unitize(diameter / 2));
				this._pagingControlContentContainer.add(indicator);
			}
			!hidePagingControl && this._showPagingControl();
		}