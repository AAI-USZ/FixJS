function (response) {
                // set `this.data`
                this.setData(response);
                if ( ! this.has_data ) {
                    // if `setData` failed, reject the promise
                    dfrd_update.reject(response);
                } else {
                    // if success notify a signal that we have `data` and resolve the promise
                    this.notify(true, 'post_fetch_data', response);
                    dfrd_update.resolve();
                }
            }