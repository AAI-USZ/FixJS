function(mousePos,isMaintainRatio) {
			var newX = _anchor.crop.x, newY = _anchor.crop.y,
				newW = _anchor.crop.w, newH = _anchor.crop.h,
				deltaX, deltaY;
				
			deltaX = mousePos.x - _anchor.x;
			deltaY = mousePos.y - _anchor.y;
			
			switch (_anchor.marker) 
			{
				case 0: newX += deltaX;
						newW = _anchor.crop.w - deltaX;
						if (isMaintainRatio)
						{
							newY += deltaX;
							newH = _anchor.crop.h - deltaX;
						}
						else
						{
							newY += deltaY;
							newH = _anchor.crop.h - deltaY;
						}
						break;
				case 1: newY += deltaY;
						newH = _anchor.crop.h - deltaY;
						break;
				case 2: newW += deltaX;
						if (isMaintainRatio)
						{
							newY += -deltaX;
							newH = _anchor.crop.h + deltaX;
						}
						else
						{
							newY += deltaY;
							newH = _anchor.crop.h - deltaY;
						}
						break;
				case 3: newW += deltaX;
						break;
				case 4: newW += deltaX;
						newH += isMaintainRatio ? deltaX : deltaY;
						break;
				case 5:	newH += deltaY;
						break;
				case 6: newX += deltaX;
						newW = _anchor.crop.w - deltaX;
						newH += isMaintainRatio ? -deltaX : deltaY;
						break;
				case 7: newX += deltaX;
						newW = _anchor.crop.w - deltaX;
						break;
			}
			
			if (newX < 0)
			{
				newX = 0;
				newW = _anchor.x + _anchor.crop.w;
			}
			if (newY < 0)
			{
				newY = 0;
				newH = _anchor.y + _anchor.crop.h;
			}
			
			if (newW < _cropLimit.w)
			{
				newW = _cropLimit.w;
				if (_anchor.marker < 2 || _anchor.marker > 5)
				{
					newX = _anchor.crop.w - _cropLimit.w + _anchor.crop.x;
				}
			}
			else if (newW > cnv_crop.width-_crop.x)
				newW = cnv_crop.width-_crop.x;
				
			if (newH < _cropLimit.h)
			{
				newH = _cropLimit.h;
				if (_anchor.marker < 3 || _anchor.marker > 6)
				{
					newY = _anchor.crop.h - _cropLimit.h + _anchor.crop.y;
					console.log(newY);
				}
			}
			else if (newH > cnv_crop.height-_crop.y)
				newH = cnv_crop.height-_crop.y;
			
			_crop.x = newX;
			_crop.y = newY;
			_crop.w = newW;
			_crop.h = newH;
			
			this.drawCrop();
			
			// update crop size fields
			$(crop_width).val(_crop.w);
			$(crop_height).val(_crop.h);
		}