function( inx, doc ){
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
							'autoplay': true
						}).data('meta', doc)
					));
			}