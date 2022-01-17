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
				onmoved : playlistItemDidMove,
				onnoderemoved : playlistItemWasRemoved
			})
			
			// make an info bar instance.
			self.infoBar = new PlaylistInfoBar(self.node)
			
			function playlistItemDidMove() {}
			
			function playlistItemWasRemoved() {}

			if ( self.options.onload ) {
				self.options.onload(self)
			}
		}