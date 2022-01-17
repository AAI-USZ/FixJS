function( oElement ) {
			if( typeof( oElement.offsetParent ) != 'undefined' ) {
				for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent ) {
					posX += oElement.offsetLeft;
					posY += oElement.offsetTop;
				}
				return {'x':posX, 'y':posY };
			} else {
				return {'x':oElement.x, 'y':oElement.y };
			}
		}