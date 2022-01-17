function(){
			savePolygon(path);
			showArticles(path,function(err,data){
				$('section[role="main"]').html(data);
			});
			
		}