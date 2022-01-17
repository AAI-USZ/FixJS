function handlerCallback() {
			if(queue && queue.length > 0) {
				var value = queue[0];
				if(self.fire('pull', value) && handler instanceof Function) {
					setTimeout(handler.bind(self, queue.shift(), handlerCallback), 0);
				}
			} else if(handler instanceof Function && !!self) {
				self.fire('empty');
			}
		}