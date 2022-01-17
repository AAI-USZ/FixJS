function(inValue, inRowIndex){
			if(this.getNode(inRowIndex)){
				this.grid.edit.applyCellEdit(inValue, this, inRowIndex);
			}
		}