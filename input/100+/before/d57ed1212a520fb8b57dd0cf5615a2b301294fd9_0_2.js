function(currentHash, detail){
			console.log("forward");
			this._previous = this._historyStack[this._index]['hash'];
			this._index++;
			if(this._index < this._historyStack.length - 1){
				this._next = this._historyStack[this._index + 1]['hash'];
			}else{
				this._next = null;
			}
			this._current = currentHash;

			// publish history forward event
			topic.publish("app/history/forward", [{"viewId": currentHash, "detail": detail}]);

			// transition to the target view
			this.app.trigger("transition", {
				"viewId": currentHash,
				"opts": {reverse: false}
			});
		}