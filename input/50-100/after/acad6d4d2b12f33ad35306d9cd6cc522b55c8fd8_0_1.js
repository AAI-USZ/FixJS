function(thread,board,content){
		$.ajax({
			url: forum_config['url']+'ajax/posts.php',
			data: 'do=newpost&board='+board+'&thread='+thread+'&content='+content,
			type: 'post',
			success: function(json){
				Posts.showThread(thread);
				$('#newpost-dialog').dialog('close');
			}
		});	
	}