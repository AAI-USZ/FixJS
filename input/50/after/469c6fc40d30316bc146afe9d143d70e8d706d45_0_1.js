function() {
			this.options.bubbles.at(0).btapp.get('torrent').off('add', this.on_torrent, this);
			this.torrent();
		}