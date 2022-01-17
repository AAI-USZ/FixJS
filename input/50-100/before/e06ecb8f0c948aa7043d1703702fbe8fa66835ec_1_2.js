function() {
        let allowLogout = !this._lockdownSettings.get_boolean(DISABLE_LOG_OUT_KEY);
        let multiUser = this._userManager.has_multiple_users;
        let multiSession = GdmGreeter.get_session_ids().length > 1;

        this._logoutItem.actor.visible = allowLogout && (multiUser || multiSession);
    }