function destroy(){
    if (confirm('Are you sure?')) { 
    	$("<form style='display:none' method='POST'></form>")
        	.appendTo($(this).parent())
        	.attr('action', this.href)
        	.submit();
    };
    return false;
}