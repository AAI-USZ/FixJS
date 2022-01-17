function(id,offset,callback){
		$.ajax({
			url: forum_config['url']+'ajax/posts.php',
			type: 'post',
			data: 'do=getposts&parent='+id+'&offset='+offset,
			success: function(json){
				json = eval('('+json+')');
				if(callback){ callback(json); }
			}
		});
	}