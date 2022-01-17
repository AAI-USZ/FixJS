function() {
        if (!this.authenticate()) {
            return;
        }

        this.current_content_view = this.get_or_create_view("LoginHelp");
        this.current_content_view.reset();

        this._router.navigate("getting-started");
    }