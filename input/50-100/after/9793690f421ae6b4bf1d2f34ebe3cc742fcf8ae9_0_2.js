function _getBitmapData(){
			if(_bitmapData){
				console.log('a')
				console.log(_bitmapData)
				return _bitmapData;
			}else if(_originalBitmapData) {
				console.log('b')
				return _originalBitmapData;
			}else {
				smp.log('CanvasBitmapData -> No BitmapData initialized.');
			}
		}