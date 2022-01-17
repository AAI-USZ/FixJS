function (response) {
                // notify there was an error and allow user to continue with either:
                //
                // * __success flow__: success callback is sent as the last argument to the signal's handler
                // * __failrue flow__: in case anything but `false` is returned from `update_error` handler
                // * __or abort it all__: return `false` from `update_error` handler
                var _abort_fail = this.notify.apply(this, [true, 'update_error'].concat(arraySlice.call(arguments), _success.bind(this)));
                if ( _abort_fail !== false ) {
                    // publish an error has occurred with `update`
                    this.publish('update_error', response, true);
                    dfrd_update.reject(response);
                }
            }