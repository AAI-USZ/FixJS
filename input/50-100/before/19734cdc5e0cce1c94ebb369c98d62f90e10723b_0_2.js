function(data) {
            $('.NB-modal-loading', this.$modal).removeClass('NB-active');
            this.profile = this.model.user_profile;
            this.services = data.services;
            this.make_profile_section();
            this.make_profile_photo_chooser();
            this.choose_color();
            callback && callback();
        }