function( query ){
		$('#vid-wall-title').text( query );
		var query = query.replace(/ /g, ' OR ');
		var vidCount = 0;
		archiveUtil.searchTV( query, function( videoItems ) {
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
							'autoplay': true
						}).data('meta', doc)
					));
			});
		});
	}