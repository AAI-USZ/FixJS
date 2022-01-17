function(e) {
		if (readCookie('logged_in')){
			var track = $(e.currentTarget).data('track_id');
			var count = $(e.currentTarget).parent().children('.vote_count').text();
			if (!$(this).hasClass('upvoted')) {
				$(this).addClass('upvoted');
				if ($(this).parent().children('.downvote').hasClass('downvoted')) {
					$(this).parent().children('.vote_count').text(Number(count)+2);
					$(this).parent().children('.downvote').removeClass('downvoted');
					$.post('/track/upvote/' + track);
					$.post('/track/upvote/' + track);
				}else{
					$(this).parent().children('.vote_count').text(Number(count)+1);
					$.post('/track/upvote/' + track);
				}
			}else{
				$(this).removeClass('upvoted');
				$(this).parent().children('.vote_count').text(Number(count)-1);
				$.post('/track/downvote/' + track);
			}
		}else{
			$('#error_message').text('You must log in to vote or comment!').removeClass('hidden');
			window.scrollTo(0, 0);
		}
	}