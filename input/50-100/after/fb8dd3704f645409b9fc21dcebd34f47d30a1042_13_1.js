function(left, right, radius) {
			setStyle(this._upArrow, "borderTopLeftRadius", left ? radius : "0px");
			setStyle(this._downArrow, "borderBottomLeftRadius", left ? radius : "0px");
			setStyle(this._upArrow, "borderTopRightRadius", right ? radius : "0px");
			setStyle(this._downArrow, "borderBottomRightRadius", right ? radius : "0px");
			this.borderWidth = [0, right ? 0 : 1, 0, 0];
			this.borderColor = "#666";
		}