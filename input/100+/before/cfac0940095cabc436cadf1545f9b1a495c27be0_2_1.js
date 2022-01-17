function () {
		
			// define columns to use.
			self.columns = options.hasOwnProperty('useColumns') ? options.useColumns : ['trackno','trackname','albumname','artistname','tracklength']
			
			// create the root playlist element node.
			var node = self.node = util.createElement({
				tag : 'div',
				id : 'UIPlaylist'
			})
			
			// create the header.
			var header = self.header = util.createElement({
				tag : 'div',
				appendTo : node
			})

			var control = self.control = PlaylistControlBar.call(self, options.withControlBarButtons)
			
			var legend = new PlaylistLegend(header).withColumns(self.columns)
			
			var listContainer = self.listContainer = util.createElement({
				'tag' : 'div',
				'customClass' : 'listContainer',
				'appendTo' : node
			})
			
			var list = self.list = new RearrangeableList({
				appendTo : listContainer,
				onmove : playlistItemDidMove,
				onremove : playlistItemWasRemoved
			})
			
			// make an info bar instance.
			self.infoBar = new PlaylistInfoBar(self.node)
			
			function playlistItemDidMove(from, to) {

				// disable the undo/redo tracking on the UndoManager instance.
				self.super.playlistModel.model.anonymousMutation = true

				var item = self.super.playlistModel.model.splice(from, 1)[0]
				
				self.super.playlistModel.model.splice(to - 1, 0, item)
				
				self.super.playlistModel.model.anonymousMutation = undefined
			}
			
			function playlistItemWasRemoved() {
			
				console.log("An item was removed.")
			}

			if ( self.options.onload ) {
				self.options.onload(self)
			}
		}