function() {
        if (!this.authenticate()) {
            return;
        }

        this.current_content_view = this.get_or_create_view("Welcome");
        this.current_content_view.reset();

        this._router.navigate("welcome");
    }