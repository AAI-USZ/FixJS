function() {
    $('.tooltip_hider').hover(
	function(){
	    $('.tooltip_pane').slideDown('normal');
	},
	function(){
	    $('.tooltip_pane').slideUp('fast');
	}
    );}