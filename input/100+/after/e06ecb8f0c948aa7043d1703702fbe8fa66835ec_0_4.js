function(userName) {
         let hold = new Batch.Hold();

         this._userVerifier = null;

         // If possible, reauthenticate an already running session,
         // so any session specific credentials get updated appropriately
         this._greeterClient.open_reauthentication_channel(userName,
                                                           null,
                                                           Lang.bind(this, function(client, result) {
             try {
                 this._userVerifier = this._greeterClient.open_reauthentication_channel_finish(result);
                 hold.release();
             } catch (e) {
                 // If there's no session running, or it otherwise fails, then fall back
                 // to performing verification from this login session
                 this._greeterClient.get_user_verifier(null,
                                                       Lang.bind(this, function(client, result) {
                     this._userVerifier = this._greeterClient.get_user_verifier_finish(result);
                     hold.release();
                 }));
             }
         }));

         hold.connect('release', Lang.bind(this, function() {
             if (this._userVerifier) {
                let ids = [];
                let id;

                id = this._userVerifier.connect('info',
                                                Lang.bind(this, this._onInfo));
                ids.push(id);
                id = this._userVerifier.connect('problem',
                                                Lang.bind(this, this._onProblem));
                ids.push(id);
                id = this._userVerifier.connect('info-query',
                                                Lang.bind(this, this._onInfoQuery));
                ids.push(id);
                id = this._userVerifier.connect('secret-info-query',
                                                Lang.bind(this, this._onSecretInfoQuery));
                ids.push(id);
                id = this._userVerifier.connect('conversation-stopped',
                                                Lang.bind(this, this._onConversationStopped));
                ids.push(id);
                id = this._userVerifier.connect('reset',
                                                Lang.bind(this, function() {
                                                    for (let i = 0; i < ids.length; i++)
                                                        this._userVerifier.disconnect(ids[i]);

                                                    this._onReset();
                                                }));
                ids.push(id);
             }
         }));

        return hold;
    }