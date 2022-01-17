function( videoItems ) {
			_this.$target.text('');
			$.each( videoItems, function( inx, doc ){
				if( vidCount > totalVideoCount){
					return ;
				}
				vidCount++;
				_this.$target
					.append( $("<div class=\"video-container\" />")
					.append(
						$('<video />').attr({
							'poster' : doc.thumb,
							'src': doc.video,
							'preload': 'none',
							'controls': 'true',
							'autoplay': true
						}).data('meta', doc)
					));
			});
			// once all the video is in the page bind the videos
			_this.bindVideos();
			
		}