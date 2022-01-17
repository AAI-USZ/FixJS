function(draggable) {
					// Only allow drops of torrents
					var torrent = draggable.data('torrent');
					if(!draggable.data('bubble') || !torrent) {
						return;
					}

					var addable = this.model.btapp.has('add');
					var duplicate = this.model.btapp.has('torrent') && this.model.btapp.get('torrent').get(torrent.id.toUpperCase());
					var ret = addable && !duplicate;
					return ret;
				}