function move(mouse){
    if($('#mouse_'+mouse['id']).length == 0) {
	$('body').append('<span class="mouse" id="mouse_'+mouse['id']+'"><span style="display:none;" class="chat"/></span>');
    }
    $('#mouse_'+mouse['id']).css({
	'left' : (($(window).width() - mouse['w']) / 2 + mouse['cx']) + 'px',
	'top' : mouse['cy'] + 'px',
        'background-color' : mouse['color']
    })
}