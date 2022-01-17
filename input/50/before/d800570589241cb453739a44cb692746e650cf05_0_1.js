function(){
			// summary:
			//		Method to clear the state after a transition.
			this._beforeClear();
			this._removeState(this.endState);
			// console.log(this.node.id + " clear.");
			this._onAfterEnd();
		}