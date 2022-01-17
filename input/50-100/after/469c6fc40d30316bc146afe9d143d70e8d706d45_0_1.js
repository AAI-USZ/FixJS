function() {
			if(this.options.bubbles.at(0).btapp.get('torrent').length > 0) {
				this.torrent();
			} else {
				this.options.bubbles.at(0).btapp.get('torrent').on('add', this.on_torrent, this);
			}
		}