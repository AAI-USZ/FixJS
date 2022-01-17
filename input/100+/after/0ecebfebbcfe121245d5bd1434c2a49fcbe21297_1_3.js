function(type) {
		if (type == "gs") {
			//greyscale
		} else {
			binary = ""
			for (y=0;y<$P.iconSize;y++) {
				for (x=0;x<$P.iconSize;x++) {
					data = $C.getImageData(parseInt(x*$P.pixelSize+$P.pixelSize/2),parseInt(y*$P.pixelSize+$P.pixelSize/2),1,1).data
					if (data[0] > 128 || data[3] == 0) binary += "0"
					else binary += "1"
				}
			}
			console.log(binary)
			console.log(parseInt(binary,2))
			return Base64.encode(""+parseInt(binary,2))
		}
	}