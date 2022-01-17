function(){
			$(this.el).addClass('georefine-client');
			this.render();
			this.on('ready', this.onReady, this);
		}