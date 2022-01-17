function( videoItems ) {
			_this.$target.text('');
			$.each( videoItems, function( inx, doc ){
				if( vidCount > totalVideoCount){
					return ;
				}
				vidCount++;
				_this.$target.append(
					$('<video />').attr({
						'poster' : doc.thumb,
						'src': doc.video,
						'preload': 'none'
					}).css({
						'width': '160px'
					})
					.data('meta', doc)
				);
			});
			// once all the video is in the page bind the videos
			_this.bindVidoes();
			
		}