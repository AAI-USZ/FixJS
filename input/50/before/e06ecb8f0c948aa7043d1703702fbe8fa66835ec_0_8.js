function() {
                         let userName = activatedItem.user.get_user_name();
                         this._greeterClient.call_begin_verification_for_user(_PASSWORD_SERVICE_NAME,
                                                                              userName);

                         if (this._haveFingerprintReader)
                             this._greeterClient.call_begin_verification_for_user(_FINGERPRINT_SERVICE_NAME, userName);
                     }