function() {

        if(!this.injection_initialized) {

            this.$el.addClass("inactive").attr('title', 'Initializing...');

            return;

        }



        if(this._is_active()){

            this.$el.removeClass("inactive").attr('title', 'Turn Off uQuest');

        } else {

            this.$el.addClass("inactive").attr('title', 'Turn On uQuest');

        }

    }