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
				onbeforemove : playlistItemWillMove,
				onaftermove : playlistItemDidMove,
				onremove : playlistItemWasRemoved
			})
			
			// make an info bar instance.
			self.infoBar = new PlaylistInfoBar(self.node)
			
			function playlistItemWillMove(from, to, insertDirection) {

				var model = self.super.playlistModel.model

				model.anonymousMutation = true

				if ( insertDirection == 'before' ) {
				
					model.splice(to - 1, 0, model.splice(from, 1)[0])
				} else {
				
					model.splice(to, 0, model.splice(from, 1)[0])
				}
				
				delete model.anonymousMutation
			}
			
			function playlistItemDidMove() {
			
				if ( self.playingNode ) {
				
					self.super.playlistModel.index = util.indexOfNode(
						self.playingNode
					)
				}
			}
			
			function playlistItemWasRemoved() {
			
				console.log("An item was removed.")
			}

			if ( self.options.onload ) {
				self.options.onload(self)
			}
		}