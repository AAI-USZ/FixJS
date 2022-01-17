function() {
	$('.titlebarText').css({'margin-left': '20px'});
	$('.titlebarLabel').append('<div class="reschatw" style="float: left; width: 18px;height: 18px;background-image: url(https://s-static.ak.fbcdn.net/rsrc.php/v2/y1/r/HbofewrOY-l.png);position: absolute;margin-top: 0px;top: 1px;left: 1px;background-position-y: 152px;"></div>');  
	dragobj = $('.reschatw');
	resobj =  $('#fbDockChatTabs .fbMercuryChatTab.opened');
	resize();
}