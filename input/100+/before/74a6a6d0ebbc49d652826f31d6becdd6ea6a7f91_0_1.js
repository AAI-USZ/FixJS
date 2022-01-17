function(mousePos,isMaintainRatio) {
			var newX = _anchor.crop.x, newY = _anchor.crop.y,
				newW = _anchor.crop.w, newH = _anchor.crop.h;
				
			switch (_anchor.marker) 
			{
				case 0: newX += mousePos.x - _anchor.x;
						newW += _anchor.x - newX;
						newY += isMaintainRatio ? mousePos.x - _anchor.x : mousePos.y - _anchor.y;
						newH += _anchor.y - newY;
						break;
				case 1: newY += mousePos.y - _anchor.y;
						newH += _anchor.y - newY;
						break;
				case 2: newW += mousePos.x - _anchor.x;
						newY += isMaintainRatio ? -(mousePos.x - _anchor.x) : mousePos.y - _anchor.y;
						newH += _anchor.y - newY;
						break;
				case 3: newW += mousePos.x - _anchor.x;
						break;
				case 4: newW += mousePos.x - _anchor.x;
						newH += isMaintainRatio ? mousePos.x - _anchor.x : mousePos.y - _anchor.y;
						break;
				case 5:	newH += mousePos.y - _anchor.y;
						break;
				case 6: newX += mousePos.x - _anchor.x;
						newW += _anchor.x - newX;
						newH += isMaintainRatio ? -(mousePos.x - _anchor.x) : mousePos.y - _anchor.y;
						break;
				case 7: newX += mousePos.x - _anchor.x;
						newW += _anchor.x - newX;
						break;
			}
			
			newW = Math.max(newW,_cropLimit.w);
			newH = Math.max(newH,_cropLimit.h);
			
			_crop.x = newX;
			_crop.y = newY;
			_crop.w = newW;
			_crop.h = newH;
			
			this.drawCrop();
			
			// update crop size fields
			$(crop_width).val(_crop.w);
			$(crop_height).val(_crop.h);
		}