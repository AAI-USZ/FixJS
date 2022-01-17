function() {
			// pause video
			_V_(this.model.attributes.uid).pause();
					
			// remove video player
			this.$el.find('.video-player').remove();
			
			// but show the poster and Tout details
			this.$el.find('.vid-image').show();
            this.$el.find('.share-bar-container').show();
			this.$el.find('.tout-deets').show();
		}