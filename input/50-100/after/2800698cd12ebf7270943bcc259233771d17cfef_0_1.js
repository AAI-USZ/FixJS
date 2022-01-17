function destroy(lnk){
    if (confirm('Are you sure?')) { 
    	$("<form style='display:none' method='POST'></form>")
        	.appendTo($(lnk).parent())
        	.attr('action', lnk.href)
        	.submit();
    };
    return false;
}