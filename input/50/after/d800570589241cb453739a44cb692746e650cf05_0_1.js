function(){
			// summary:
			//		Method to clear the state after a transition.
			if(this._cleared) {
				return;
			}
			this._cleared = true; // set clear flag to true

			this._beforeClear();
			this._removeState(this.endState);
			// console.log(this.node.id + " clear.");
			this._onAfterEnd();
		}