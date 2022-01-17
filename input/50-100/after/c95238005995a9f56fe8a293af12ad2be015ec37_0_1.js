function(value) {
                    if(dfd !== _currentDfd) {
                        remove(self._currentDfds, dfd);
                        return $.Deferred().reject();
                    }
                    // self._currentDfds.length = 0;
                    remove(self._currentDfds, dfd);
                    _currentDfd = undefined;
                    return this.resolve();
                }