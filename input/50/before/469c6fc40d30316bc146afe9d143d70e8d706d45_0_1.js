function() {
			this.options.bubbles.at(0).btapp.get('torrent').off('add', this.torrent, this);
			this.torrent();
		}