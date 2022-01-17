function _setBitmapData(canvas){
			_bitmapData = _context.getImageData(0,0,canvas.width, canvas.height);
			
			//save original data:
			_originalBitmapData = _cloneBitmapData(_bitmapData);
		}