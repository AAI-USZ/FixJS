function() {
        $.fn.reverse = [].reverse;
    	var $trs = $libTable.find("tbody input:checkbox").parents("tr").reverse();

    	$trs.each(function(i, el){
    		$el = $(this);
    		
    		mod.selectItem($el);
    	});
    }