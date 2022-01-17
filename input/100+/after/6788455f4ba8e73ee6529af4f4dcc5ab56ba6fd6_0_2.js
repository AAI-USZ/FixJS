function(e, i){
		// summary:
		//		Begin dragging the splitter between child[i] and child[i+1]

		var children = this.getChildren();

		this.paneBefore = children[i];
		this.paneAfter = children[i+1];

		this.paneBefore.sizeBeforeDrag = this.paneBefore.sizeActual;
		this.paneAfter.sizeBeforeDrag = this.paneAfter.sizeActual;
		this.paneAfter.positionBeforeDrag = this.paneAfter.position;

		this.isSizing = true;
		this.sizingSplitter = this.sizers[i];
		this.sizingSplitter.positionBeforeDrag = domStyle.get(this.sizingSplitter,(this.isHorizontal ? "left" : "top"));

		if(!this.cover){
			this.cover = domConstruct.create('div', {
				style: {
					position:'absolute',
					zIndex:5,
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				}
			}, this.domNode);
		}else{
			this.cover.style.zIndex = 5;
		}
		this.sizingSplitter.style.zIndex = 6;

		// startPoint is the e.pageX or e.pageY at start of drag
		this.startPoint = this.lastPoint = (this.isHorizontal ? e.pageX : e.pageY);

		// Calculate maximum to the left or right that splitter is allowed to be dragged
		// minDelta is negative to indicate left/upward drag where end.pageX < start.pageX.
		this.maxDelta = this.paneAfter.sizeActual - this.paneAfter.sizeMin;
		this.minDelta = -1 * (this.paneBefore.sizeActual - this.paneBefore.sizeMin);

		if(!this.activeSizing){
			this._showSizingLine();
		}

		// attach mouse events
		this._ownconnects = [
			on(this.ownerDocument.documentElement, "mousemove", lang.hitch(this, "changeSizing")),
			on(this.ownerDocument.documentElement, "mouseup", lang.hitch(this, "endSizing"))
		];

		event.stop(e);
	}