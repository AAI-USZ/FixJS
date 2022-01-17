function() {
		if(self.visible) {
			updateBB();
			var p = self.absolutePosition.clone();
			if(self.scrollLock && p.X < 0) {
				p.X += a2d.dimension.Width;              
			}
			if(self.scrollLock && p.Y < 0) {
				p.Y += a2d.dimension.Height;
			}		
			p.add(this.offset);
			if(this.relative) {
				p.add(this.parent.position);
			}	

	  		//p.X -= a2d.context.measureText(text).width / 2;
	  		//p.Y -= a2d.context.measureText("m").width / 2;
	  		a2d.context.globalAlpha = this.opacity;
	  		a2d.context.textAlign = this.textAlign;//"center";
	  		a2d.context.textBaseline = "middle";
			a2d.context.font = self.font;
			a2d.context.fillStyle = self.color;
			if(this.border.width !== 0) {
				a2d.context.lineWidth = this.border.width;
				a2d.context.strokeStyle = this.border.color;
				a2d.context.strokeText(this.text, p.X, p.Y);
			}		
			a2d.context.fillText(this.text, p.X, p.Y);
			$draw();
		}
	}