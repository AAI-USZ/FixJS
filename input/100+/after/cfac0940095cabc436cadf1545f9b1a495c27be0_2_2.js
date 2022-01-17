function playlistItemDidMove() {
			
				if ( self.playingNode ) {
				
					self.super.playlistModel.index = util.indexOfNode(
						self.playingNode
					)
				}
			}