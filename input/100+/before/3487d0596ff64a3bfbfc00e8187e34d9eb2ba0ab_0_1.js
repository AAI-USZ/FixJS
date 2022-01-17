function (event) {
            var ptrParent = nj.queryParentSelector(event.target, ".container-layer"),
            	i = 0,
            	arrLayers = document.querySelectorAll(".container-layer"),
            	arrLayersLength = arrLayers.length,
            	targetIndex = 0,
	            isAlreadySelected = false,
	            indexAlreadySelected = 0,
	            indexLastClicked = 0;

			// Did the mousedown event originate within a layer?
			if (ptrParent === false) {
				// No it did not.  Do nothing.
				return;
			}
			
			// Get the targetIndex, the index in the arrLayers of the 
			// layer that was just clicked on
            for (i = 0; i < arrLayersLength; i++) {
            	if (arrLayers[i] == ptrParent) {
            		targetIndex = i;
            	}
            }
            
            // Did we just click on a layer that's already selected?
			if (this.currentLayersSelected !== false) {
				indexAlreadySelected = this.currentLayersSelected.indexOf(targetIndex);
			}
			if (indexAlreadySelected > -1) {
				isAlreadySelected = true;
			}
			
			/*
			if (targetIndex > -1) {
				indexLastClicked = targetIndex;
			}
			*/
            
            // Now, do the selection based on all of that information.
            if (this.currentLayersSelected.length === 0) {
            	// Nothing selected yet, so just push the new index into the array.
            	this.currentLayersSelected.push(targetIndex);
            } else {
            	// Something is already selected.  What do do depends on whether
            	// or not other keys are pressed.
	            if (this._isControlPressed === true) {
	            	// Control key is being pressed, so we need to 
	            	// either add the current layer to selectedLayers
	            	// or remove it if it's already there.
					if (this.currentLayersSelected === false) {
						this.currentLayersSelected = [];
						//this.currentLayerSelected = false;
					}
	            	if (isAlreadySelected === false) {
	            		this.currentLayersSelected.push(targetIndex);
	            	} else {
	            		this.currentLayersSelected.splice(indexAlreadySelected, 1);
	            	}
	            	this.lastLayerClicked = targetIndex;
	            } else if (this._isShiftPressed === true) {
	            	// The shift key is being pressed.
	            	// Start by selecting the lastLayerClicked
					if (this.currentLayersSelected === false) {
						this.currentLayersSelected = [];
						//this.currentLayerSelected = false;
					}
					this.currentLayersSelected = [this.lastLayerClicked];
					// Add all the layers between lastLayerClicked and targetIndex
	            	if (targetIndex > this.lastLayerClicked) {
	            		for (i = this.lastLayerClicked+1; i <= targetIndex; i++) {
	            			this.currentLayersSelected.push(i);
	            		}
	            	} else if (targetIndex < this.lastLayerClicked) {
	            		for (i = targetIndex; i < this.lastLayerClicked; i++) {
	            			this.currentLayersSelected.push(i);
	            		}
	            	}
	            } else {
	            	// No key is pressed, so just select the element
	            	// and update lastLayerClicked
	            	this.currentLayersSelected = [targetIndex];
	            	this.lastLayerClicked = targetIndex;
	            }
	            
            }
            //this._captureSelection = true;
            this.selectLayers(this.currentLayersSelected);
            this.updateStageSelection();
        }