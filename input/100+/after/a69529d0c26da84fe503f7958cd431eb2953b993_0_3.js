function(index, step){
			if(index < 0 || (index > window.history.length - 1)){
				throw Error("Application history.go steps out of management.");
			}

			this._index = index;
			this._current = this._historyStack[index]['hash'];
			this._previous = this._historyStack[index - 1] ? this._historyStack[index - 1]['hash'] : null;
			this._next = this._historyStack[index + 1] ? this._historyStack[index + 1]['hash'] : null;

			// publish history go event
			topic.publish("/app/history/go", {"viewId": this._current, "step": step, "detail": this._historyStack[index]["detail"]});

			var param;
			if(step > 0){
				param = {
					"viewId": this._current,
					"opts": {reverse: false}
				};
			}else{
				param = {
					"viewId": this._current,
					"opts": {reverse: true}
				};
			}
			// transition to the target view
			this.app.trigger("transition", param);
		}