function() {
                         let hold = new Batch.Hold();

                         this._userVerifier.call_begin_verification(_PASSWORD_SERVICE_NAME,
                                                                    null,
                                                                    Lang.bind(this, function (userVerifier, result) {
                             this._userVerifier.call_begin_verification_finish (result);
                             hold.release();
                         }));

                         return hold;
                     }