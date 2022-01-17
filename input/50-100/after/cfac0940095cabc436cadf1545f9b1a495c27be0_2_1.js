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