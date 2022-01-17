function _setImage(image)
		{
			_imageWidth = image.width;
			_imageHeight = image.height;
			_canvas.setAttribute('width', _imageWidth);
			_canvas.setAttribute('height', _imageHeight);
			_clipObj.w = _imageWidth;
			_clipObj.h = _imageHeight;
			_context.drawImage(image, 0, 0, _imageWidth, _imageHeight);
			_bitmapData = _context.getImageData(0,0,_imageWidth, _imageHeight);
			
			//save original data:
			_originalBitmapData = _cloneBitmapData(_bitmapData);
		}