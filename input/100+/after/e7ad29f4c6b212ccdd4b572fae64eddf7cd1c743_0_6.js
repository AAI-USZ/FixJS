function() {
				var i, j, item, reqs,
						ln = this._queue.length;

				if (ln === 0) {
					//this.triggerReady();
					console.log("UDA READY BANGET");
					return;
				}

				for (i = 0; i < ln; i++) {
					item = this._queue[i];
					if (item) {
						reqs = item.requires;
						if (reqs.length > this.numLoadedFiles) {
							continue;
						}

						j = 0;

						do {
							if (XM.ClassManager.isExist(reqs[j])) {
								XM.Array.erase(reqs, j, 1);
							}
							else {
								j++;
							}
						} while ( j < reqs.length);

						if (item.requires.length === 0) {
							XM.Array.erase(this._queue, j, 1);
							item.callback.call(item.scope);
							this._refreshQueue();
							break;
						}
					}
				}
		}