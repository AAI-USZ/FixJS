function( query ){
		var query = query.replace(/ /g, ' OR ');
		var vidCount = 0;
		archiveUtil.searchTV( query, function( videoItems ) {
			$.each( videoItems, function( inx, doc ){
				if( vidCount > totalVideoCount){
					return ;
				}
				vidCount++;
				_this.$target.append(
					$('<video />').attr({
						'poster' : doc.thumb,
						'src': doc.video,
						'autoplay': true,
						'controls': true
					}).css({
						'width': '160px'
					}).data('meta', doc)
				);
			});
		});
	}