function close() {
			if(this.fire('close')) {
				this.clear('close');
				this.on('close', function() { return false; });
				function flushQueue() {
					if(queue && queue.length > 0 && handler instanceof Function) {
						var value = queue[0];
						if(this.fire('pull', value)) {
							setTimeout(handler.bind(this, queue.shift(), flushQueue), 0);
						}
					} else {
						setTimeout(function() {
							if(handler instanceof Function) {
								handler('close');
							}
							eventHandlers = undefined;
							queue = undefined;
							handler = undefined;
							self = undefined;
							delete this;
						}, 0);
					}
				}
				setTimeout(flushQueue.bind(this), 0);
			}
		}