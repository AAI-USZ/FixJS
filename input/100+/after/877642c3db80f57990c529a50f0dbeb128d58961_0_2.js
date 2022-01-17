function(e){
			// tags:
			//		private
			this._dragging = true;

			var movingItem = this._movingItem;
			if(movingItem.get("selected")){
				movingItem.set("selected", false);
			}
			this.scaleItem(movingItem, 1.1);

			var x = e.touches ? e.touches[0].pageX : e.pageX;
			var y = e.touches ? e.touches[0].pageY : e.pageY;
			
			var enclosingScrollable = viewRegistry.getEnclosingScrollable(movingItem.domNode);
			var dx = 0;
			var dy = 0;
			if(enclosingScrollable){ // this node is placed inside a scrollable
				var pos = enclosingScrollable.getPos();
				dx = pos.x;
				dy = pos.y;
				event.stop(e);
			}
			
			var startPos = this._startPos = domGeometry.position(movingItem.domNode, true);
			this._offsetPos = {
				x: startPos.x - x - dx,
				y: startPos.y - y - dy
			};

			this._startIndex = this.getIndexOfChild(movingItem);
			this.addChild(this._blankItem, this._startIndex);
			this.moveChild(movingItem, this.getChildren().length);
			domStyle.set(movingItem.domNode, {
				position: "absolute",
				top: (startPos.y - dy) + "px",
				left: (startPos.x - dx) + "px",
				zIndex: 100
			});
		}