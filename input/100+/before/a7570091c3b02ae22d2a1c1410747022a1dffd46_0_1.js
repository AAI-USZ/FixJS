function() {
			var i = 0, 
				currentLayersSelectedLength = this.currentLayersSelected.length,
				arrLayersLength = this.arrLayers.length,
				returnVal = arrLayersLength -1;
			if (returnVal === -1) {
				return false;
			}
			if (this.currentLayersSelected === false) {
				return false;
			}
			
			for (i = 0; i < arrLayersLength; i++) {
				if (this.arrLayers[i].layerData.isSelected) {
					returnVal = i;
				}
			}
			return returnVal;
		}