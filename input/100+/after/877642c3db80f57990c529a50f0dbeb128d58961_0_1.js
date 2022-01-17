function(e){
			// tags:
			//		private
			if(!this._blankItem){
				this._blankItem = new IconItem();
				this._blankItem.domNode.style.visibility = "hidden";
				this._blankItem._onClick = function(){};
			}
			var item = this._movingItem = registry.getEnclosingWidget(e.target);
			var iconPressed = false;
			for(var n = e.target; n !== item.domNode; n = n.parentNode){
				if(n === item.iconNode){
					iconPressed = true;
					break;
				}
			}
			if(!iconPressed){ return; }

			if(!this._conn){
				// don't use touch.move since this is actually an event listened to on the document,
				// so we can't stop it when we are in a ScrollableView (to prevent the view from scrolling while dragging icons).
				this._conn = [
					this.connect(this.domNode, has("touch") ? "ontouchmove" : "onmousemove", "_onTouchMove"),
					this.connect(this.domNode, has("touch") ? "ontouchend" : "onmouseup", "_onTouchEnd")
				];
			}
			this._touchStartPosX = e.touches ? e.touches[0].pageX : e.pageX;
			this._touchStartPosY = e.touches ? e.touches[0].pageY : e.pageY;
			if(this.isEditing){
				this._onDragStart(e);
			}else{
				// set timer to detect long press
				this._pressTimer = setTimeout(lang.hitch(this, function(){
					this.startEdit();
					this._onDragStart(e);
				}), 1000);
			}
		}