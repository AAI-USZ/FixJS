function(e){
			e = e;
			this.layout.cursor.setStyles({
				'top': e.page.y - this.layout.overlay.getTop() - curH,
				'left': e.page.x - this.layout.overlay.getLeft() - curW
			});
                        this.overlayDrag.call(this);
			this.layout.drag.start(e);
		}