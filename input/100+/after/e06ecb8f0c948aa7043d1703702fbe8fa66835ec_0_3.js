function(client, serviceName) {
        this._userVerifier = null;

        this._checkForFingerprintReader();

        let tasks = [this._hidePrompt,

                     new Batch.ConcurrentBatch(this, [this._fadeInTitleLabel,
                                                      this._fadeInNotListedButton,
                                                      this._fadeInLogo]),

                     function() {
                         this._sessionList.close();
                         this._promptFingerprintMessage.hide();
                         this._userList.actor.show();
                         this._userList.actor.opacity = 255;
                         return this._userList.showItems();
                     },

                     function() {
                         this._userList.actor.reactive = true;
                         this._userList.actor.grab_key_focus();
                     }];

        this._user = null;

        let batch = new Batch.ConsecutiveBatch(this, tasks);
        batch.run();
    }