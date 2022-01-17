function(){

        if(!this.injection_initialized)

            return;



        this.model.fetch();

        this.model.switch_state();

        this.model.save();

        this._update_toolbar_button();

        this._update_page();

    }