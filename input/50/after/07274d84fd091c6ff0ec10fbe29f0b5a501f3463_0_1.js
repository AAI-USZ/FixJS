function(){
			$(this.el).addClass('georefine-client');

            this.data_view_counter = 0;

			this.render();
			this.on('ready', this.onReady, this);

		}