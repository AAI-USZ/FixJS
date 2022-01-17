function() {
		if(this.deleted)
			return;

		var tl = this.tl,
			images = tl.images,
			fonts = tl.fonts,
			ctx = tl.ctx,
			shape = this.getShape(),
			x = shape.x,
			y = shape.y,
			direction, dir, text, t_el;
			
		// is it on the screen
		if(x > -shape.width && x < tl.width) {
			ctx.save();
			ctx.translate(x, y);
			
			renderImage.apply(this, (this.selected)?[
										shape,
										images.segmentLeftSel, images.segmentRightSel, images.segmentMidSel
									]:(!this.selectable)?[
										shape,
										images.segmentLeftDark, images.segmentRightDark, images.segmentMidDark
									]:[
										shape,
										images.segmentLeft, images.segmentRight, images.segmentMid
									]);
			
			if(shape.width > 2*tl.segmentTextPadding){
				// Set the clipping bounds
				ctx.beginPath();
				ctx.moveTo(tl.segmentTextPadding, 0);
				ctx.lineTo(tl.segmentTextPadding, shape.height);
				ctx.lineTo(shape.width - tl.segmentTextPadding, shape.height);
				ctx.lineTo(shape.width - tl.segmentTextPadding, 0);
				ctx.closePath();
				ctx.clip();
				
				ctx.textBaseline = 'top';
				
				dir = tl.canvas.dir; //save
				
				if(this.id){
					direction = Ayamel.Text.getDirection(this.id);
					tl.canvas.dir = direction;
					
					ctx.font = fonts.idFont;
					ctx.fillStyle = fonts.idTextColor;
					ctx.fillText(this.id, direction === 'ltr' ? tl.segmentTextPadding : shape.width - tl.segmentTextPadding, 0);
					y = Math.max(fonts.idFontSize,tl.segmentTextPadding);
				}else{
					y = tl.segmentTextPadding;
				}
				
				t_el = document.createElement('span');
				t_el.innerHTML = this.text;
				text = t_el.innerText;
				
				direction = Ayamel.Text.getDirection(text);
				tl.canvas.dir = direction;
				
				ctx.font = fonts.segmentFont;
				ctx.fillStyle = fonts.segmentTextColor;
				ctx.fillText(text, direction === 'ltr' ? tl.segmentTextPadding : shape.width - tl.segmentTextPadding, y);
				
				tl.canvas.dir = dir; //restore
			}
			ctx.restore();
		}
	}