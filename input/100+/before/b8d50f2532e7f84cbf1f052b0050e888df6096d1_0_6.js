function loadVideoList(chan) {
    var this_chan = chan;
    var $list = $('<span></span>');
    for(var i in videos[this_chan].video) {
	var this_video = videos[this_chan].video[i];

	if (! this_video.title_unesc) {
	    this_video.title_unesc = $.unescapifyHTML(this_video.title);
	    this_video.title_quot  = String(this_video.title_unesc).replace(/\"/g,'&quot;');
	}

	var $thumbnail = $('<img id="video-list-thumb-' + i + '"' + ' rel="' + i + '"' +
			   ' title="' + this_video.title_quot + '"/>');

	// make nsfw thumbnails easily findable
	if (this_video.over_18) {
	    $thumbnail.addClass('nsfw_thumb');
	}

	$thumbnail
	    .attr('src', getThumbnailUrl(this_chan, i))
	    .click(function() { loadVideo( Number($(this).attr('rel')) ) });

	$list.append($thumbnail);
    }

    $('#video-list')
        .stop(true, true)
	.html($list)
	.show()
	.animate({ height: '88px', padding: '5px' }, 1000, function() {
	    $('img').lazyload({
		placeholder : "./img/noimage.png",
		effect : "fadeIn",
		container: $("#video-list")
	    });
	});
}