function(value) {
                    if(dfd !== _.last(self._currentDfds)) {
                        remove(self._currentDfds, dfd);
                        return $.Deferred().reject();
                    }
                    // self._currentDfds.length = 0;
                    remove(self._currentDfds, dfd);
                    return this.resolve();
                }