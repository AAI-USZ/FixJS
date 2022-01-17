function() {
        let allowSwitch = !this._lockdownSettings.get_boolean(DISABLE_USER_SWITCH_KEY);
        let multiUser = this._userManager.can_switch() && this._userManager.has_multiple_users;
        let multiSession = Gdm.get_session_ids().length > 1;

        this._loginScreenItem.label.set_text(multiUser ? _("Switch User")
                                                       : _("Switch Session"));
        this._loginScreenItem.actor.visible = allowSwitch && (multiUser || multiSession);
    }