function playlistItemDidMove(from, to) {

				// disable the undo/redo tracking on the UndoManager instance.
				self.super.playlistModel.model.disabled = true

				var item = self.super.playlistModel.model.splice(from, 1)[0]
				
				self.super.playlistModel.model.splice(to - 1, 0, item)
			}