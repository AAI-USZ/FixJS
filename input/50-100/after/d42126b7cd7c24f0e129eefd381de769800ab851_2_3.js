function(){
			var id = $(this).attr('id');
			var term = '#'+search_term+'/p'+id;
			changeHashTo(formatSearch(search_term, id, classFilter));
			page = id;
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}