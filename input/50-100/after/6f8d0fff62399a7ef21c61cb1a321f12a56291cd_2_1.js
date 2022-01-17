function(){

        if(!this.injection_initialized)

            return;



        this.model.fetch();

        this.model.switch_state();

        this.model.save();

        this.update_ui();

    }