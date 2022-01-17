function(currentHash, detail){
			console.log("back");
			this._next = this._historyStack[this._index]['hash'];
			this._index--;
			if(this._index > 0){
				this._previous = this._historyStack[this._index - 1]['hash'];
			}else{
				this._previous = null;
			}
			this._current = currentHash;

			// publish history back event
			topic.publish("/app/history/back", {"viewId": currentHash, "detail": detail});

			// transition to the target view
			this.app.trigger("transition", {
				"viewId": currentHash,
				"opts": {reverse: true}
			});
		}