function loadVideo(video) {
    var this_chan = cur_chan, this_video = cur_video, selected_video = this_video;
    if(video === 'next' && selected_video < Object.size(videos[this_chan].video)-1){
	selected_video++;
	while(sfwCheck(this_chan, selected_video) && selected_video < Object.size(videos[this_chan].video)-1){
	    selected_video++;
	}
	if(sfwCheck(this_chan, selected_video)){
	    selected_video = this_video;
	}
    }else if (selected_video > 0 && video === 'prev'){
	selected_video--;
	while(sfwCheck(this_chan, selected_video) && selected_video > 0){
	    selected_video--;
	}
	if(sfwCheck(this_chan, selected_video)){
            selected_video = this_video;
        }
    }
    if(video === 'first'){
	if(sfwCheck(this_chan, selected_video)){
            while(sfwCheck(this_chan, selected_video) && selected_video < Object.size(videos[this_chan].video)-1){
		selected_video++;
            }
	}
    }
    if(typeof(video) === 'number'){ //must be a number NOT A STRING - allows direct load of video # in video array
	selected_video = video;
    }
    if(selected_video !== this_video || video === 'first' || video === 0) {
	cur_video = selected_video;

	// scroll to thumbnail in video list and highlight it
	$('#video-list .focus').removeClass('focus');
	$('#video-list-thumb-' + selected_video).addClass('focus');
	$('#video-list').stop(true,true).scrollTo('.focus', { duration:1000, offset:-280 });

	// enable/disable nav-buttons at end/beginning of playlist
	var $prevbutton = $('#prev-button'), $nextbutton = $('#next-button');
	if(selected_video <= 0){
	    $prevbutton.stop(true,true).fadeOut('slow', function() {
		$(this).css({ 'visibility':'hidden', 'display':'inline' });
	    });
	}else if($prevbutton.css('visibility') === 'hidden'){
	    $prevbutton.hide().css({ 'visibility':'visible' }).stop(true,true).fadeIn('slow');
	}

	if(cur_video >= Object.size(videos[this_chan].video)-1){
	    $nextbutton.stop(true,true).fadeOut('slow', function() {
		$(this).css({ 'visibility':'hidden', 'display':'inline' });
	    });
	}else if($nextbutton.css('visibility') === 'hidden'){
	    $nextbutton.hide().css({ 'visibility':'visible' }).stop(true,true).fadeIn('slow');
	}

	//set location hash
	var hash = document.location.hash;
        if(!hash){
	    var feed = channels[this_chan].feed;
	    var parts = feed.split("/");
	    hash = '/'+parts[1]+'/'+parts[2]+'/'+videos[this_chan].video[selected_video].id;
        }else{
            var anchor = hash.substring(1);
            var parts = anchor.split("/"); // #/r/videos/id
            hash = '/'+parts[1]+'/'+parts[2]+'/'+videos[this_chan].video[selected_video].id;
	}
	currentAnchor = '#'+hash;
        window.location.hash = hash;

	$('#video-embed').empty();
	var embed = $.unescapifyHTML(videos[this_chan].video[selected_video].media_embed.content);
	if(videos[this_chan].video[selected_video].media.type === 'youtube.com'){
	    embed = prepYT(embed);
	}else{
	    yt_player = false;
	}

	var redditlink = 'http://reddit.com'+$.unescapifyHTML(videos[this_chan].video[selected_video].permalink);
	$('#video-title').html('<a href="' + redditlink + '" target="_blank"'
			       + ' title="' + videos[this_chan].video[selected_video].title_quot + '">'
			       + videos[this_chan].video[selected_video].title_unesc + '</a>');
	$('#video-embed').html(embed);
	
	/*
	var reddit_string="<iframe src=\"http://www.reddit.com/static/button/button1.html?width=120";
	//reddit_string += '&id=' + videos[cur_chan].video[cur_video].id;
        reddit_string += '&url=' + encodeURIComponent(videos[cur_chan].video[cur_video].url.replace(/&amp;/g, "&"));
        reddit_string += '&title=' + encodeURIComponent($.unescapifyHTML(videos[cur_chan].video[cur_video].title));
        //reddit_string += '&sr=' + encodeURIComponent($.unescapifyHTML(videos[cur_chan].video[cur_video].subreddit));
        //reddit_string += '&css=' + encodeURIComponent(window.reddit_css);
        //reddit_string += '&bgcolor=' + encodeURIComponent(window.reddit_bgcolor); 
        //reddit_string += '&bordercolor=' + encodeURIComponent(window.reddit_bordercolor); 
        reddit_string += '&newwindow=' + encodeURIComponent('1');
        reddit_string += "\" height=\"22\" width=\"150\" scrolling='no' frameborder='0'></iframe>";
	*/

	var score = videos[this_chan].video[selected_video].score;
	var num_comments = videos[this_chan].video[selected_video].num_comments;
	var reddit_string = '<a href="'+redditlink+'" target="_blank">'
	    + score + ((score === 1) ? ' vote' : ' votes')
	    + ' &bull; '
	    + num_comments + ((num_comments === 1) ? ' comment' : ' comments')
	    + '</a>';

	var $vote_button = $('#vote-button');
	$vote_button.stop(true,true).fadeOut('slow', function() {
	    $vote_button.html(reddit_string).fadeIn('slow');
	});

	var video_source_text = 'Source: '
	    + '<a href="' + videos[this_chan].video[selected_video].url + '" target="_blank">'
	    + videos[this_chan].video[selected_video].media.oembed.provider_name
	    + '</a>';
	var $video_source = $('#video-source');
	$video_source.stop(true,true).fadeOut('slow', function() {
	    $video_source.html(video_source_text).fadeIn('slow');
	});

	fillScreen();
    }
}