function() {
            this.inherited(arguments);

            //this.scene.showView('quick_nav', {}, 'navigation');
            this.scene.showView('home');
            this.scene.showView('account_edit', {insert: true});
            return;

            if (App.isOnline() || !App.enableCaching)
            {
                this.handleAuthentication();
            }
            else
            {
                // todo: always navigate to home when offline? data may not be available for restored state.
                this.navigateToHomeView();
            }

            if (this.enableUpdateNotification)
                this._checkForUpdate();
        }