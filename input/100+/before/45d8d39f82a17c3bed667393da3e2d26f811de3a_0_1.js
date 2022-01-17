function() {
        if (this.model) {

            var progress_width = Math.floor(this.model.get('complete')/10) + '%';

            if (this.model.get('selected')) {
                this.$('.bt_torrent_list').addClass('selected_torrent');
            } else {
                this.$('.bt_torrent_list').removeClass('selected_torrent');
            }

            this.$('.torrent_info').html( this.model.get('name') );
            this.$('.torrent_info_percent_complete').html( progress_width );

            // format the down speed
            var speed = this.model.get('down_speed') + this.model.get('up_speed'); 
            if (speed > 1) {
                this.$('.torrent_info_speed').html( to_file_size(speed) + '/s' );
            } else {
                this.$('.torrent_info_speed').html( '' );
            }
            this.$('.color_calc').css('width', progress_width);

            if (this.model.started()) {
                this.$('.bt_button_play').css('display','none');
                this.$('.bt_button_pause').css('display','block');
            } else {
                this.$('.bt_button_pause').css('display','none');
                this.$('.bt_button_play').css('display','block');
            }
            if (this.model.started()) {
                if (this.model.isCompleted()) {
                    this.$('.torrent_dl_color').css('background-color','#86c440');
                } else {
                    this.$('.torrent_dl_color').css('background-color','#3499ff');
                }
            } else {
                this.$('.torrent_dl_color').css('background-color','#cecece');
            }


            if (this.model.get('message').match(/error/i)) { 
                this.$('.torrent_dl_color').css('background-color','#ff2233');
            }


        } else {
            this.$('.torrent_info').html( 'no torrents' );
        }
        return this.$el;
    }