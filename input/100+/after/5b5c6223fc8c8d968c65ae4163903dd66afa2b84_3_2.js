function() {
		    if ($('.sn-expander-text:not([aria-expander="expander"])').size() != 0) {
		    	$('.sn-expander-text:not([aria-expander="expander"])').attr('aria-expander', 'expander').expander({
			        slicePoint : 500,
			        widow : 2,
			        preserveWords : false,
			        expandText : $.sn.expanderTextMore,
			        userCollapseText : $.sn.expanderTextLess,
			        expandPrefix : '...',
			        userCollapsePrefix : ' ',
			        moreClass : 'sn-expander-more',
			        lessClass : 'sn-expander-less',
			        detailClass : 'sn-expander-details'
			    });
		    }
	    }