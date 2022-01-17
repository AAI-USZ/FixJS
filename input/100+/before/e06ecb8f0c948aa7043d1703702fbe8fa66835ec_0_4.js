function(activatedItem) {
        let tasks = [function() {
                         this._userList.actor.reactive = false;
                         return this._userList.pinInPlace();
                     },

                     function() {
                         return this._userList.hideItemsExcept(activatedItem);
                     },

                     function() {
                         return this._userList.giveUpWhitespace();
                     },

                     function() {
                         return activatedItem.fadeOutName();
                     },

                     new Batch.ConcurrentBatch(this, [this._fadeOutTitleLabel,
                                                      this._fadeOutNotListedButton,
                                                      this._fadeOutLogo]),

                     function() {
                         return this._userList.shrinkToNaturalHeight();
                     },

                     function() {
                         let userName = activatedItem.user.get_user_name();
                         this._greeterClient.call_begin_verification_for_user(_PASSWORD_SERVICE_NAME,
                                                                              userName);

                         if (this._haveFingerprintReader)
                             this._greeterClient.call_begin_verification_for_user(_FINGERPRINT_SERVICE_NAME, userName);
                     }];

        this._user = activatedItem.user;

        let batch = new Batch.ConsecutiveBatch(this, tasks);
        batch.run();
    }