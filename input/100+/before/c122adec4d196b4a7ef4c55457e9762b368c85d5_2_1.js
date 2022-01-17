function() {
        this.make_modal();
        this.handle_cancel();
        this.open_modal();
        this.handle_keystrokes();
        this.setup_autocomplete();
        this.setup_chosen();
        this.focus_add_feed();
        
        this.$modal.bind('click', $.rescope(this.handle_click, this));
    }