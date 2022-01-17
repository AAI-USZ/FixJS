function(nodeProp, part, amount){
				this.connect(this[nodeProp], "onclick", function(){
					this._setCurrentFocusAttr(this.dateFuncObj.add(this.currentFocus, part, amount));
				});
			}