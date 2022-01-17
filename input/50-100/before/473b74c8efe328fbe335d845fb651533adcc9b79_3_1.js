function(PlaylistInstance) {
				
					self.playlist = playlist = PlaylistInstance
				
					new PlaylistModel({
						withUI : playlist,
						withApi : api,
						onload : function(PlaylistModelInstance) {
						
							playlistModel = self.playlistModel = PlaylistModelInstance
						
							playlistModel.updateInfo()
						
							playlistModel.updateButtons()
						
							callback && callback()
						}
					})
				}