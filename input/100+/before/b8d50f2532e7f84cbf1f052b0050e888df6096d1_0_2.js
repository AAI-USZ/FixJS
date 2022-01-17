function(){
    loadSettings();
    loadTheme(theme);
    displayChannels();
    loadChannel("Videos", null);

    /* Bindings */
    $filloverlay = $('#fill-overlay');
    $fillnav = $('#fill-nav');
    $filloverlay.mouseenter(function() {
	$fillnav.slideDown('slow');
    });
    $filloverlay.mouseleave(function() {
        $fillnav.slideUp('slow');
    });
    $fillnav.click(function(){
	fillScreen();
    });
    $('#css li a').click(function() { 
	loadTheme($(this).attr('rel'));
	return false;
    });
    $('#auto').click(function() {
        auto = ($('#auto').is(':checked')) ? true : false;
	$.cookie('auto', auto, {expires: 7});
    });
    $('#sfw').click(function() {
        sfw = ($('#sfw').is(':checked')) ? true : false;
	$.cookie('sfw', sfw, {expires: 7});
	showHideNsfwThumbs(sfw, cur_chan);
    });
    $('#fill').click(function() {
	fillScreen();
    });
    $('#next-button').click(function() {
	loadVideo('next');
    });
    $('#prev-button').click(function() {
	loadVideo('prev');
    });
    $('#video-list').bind('mousewheel', function(event,delta){
        this.scrollLeft -= (delta * 30);
    });
    $(document).keydown(function (e) {
	var keyCode = e.keyCode || e.which;
	var arrow = {left: 37, up: 38, right: 39, down: 40 };
	switch (keyCode) {
	    case arrow.left:  case 72: // h
	        loadVideo('prev');
		break;
	    case arrow.up:    case 75: // k
	        chgChan('up');
		break;
	    case arrow.right: case 76: // l
		loadVideo('next');
		break;
	    case arrow.down:  case 74: // j
	        chgChan('down');
		break;
	    case 32:
                ytTogglePlay();
	        break;
	    case 70:
	        if(yt_player){
		    $('#fill').attr('checked', true);
	            fillScreen();
	        }
	        break;
	    case 27:
	        if($('#fill').is(':checked')){
		    fillScreen();
	        }
		break;
	    case 67:
	        window.open($('#vote-button>a').attr('href'), '_blank');
		break;
	}
    });

    /* Anchor Checker */
    setInterval("checkAnchor()", 100);
}