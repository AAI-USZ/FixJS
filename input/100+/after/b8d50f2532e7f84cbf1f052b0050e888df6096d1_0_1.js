function (e) {
	var keyCode = e.keyCode || e.which, arrow = {left: 37, up: 38, right: 39, down: 40 };
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
    }