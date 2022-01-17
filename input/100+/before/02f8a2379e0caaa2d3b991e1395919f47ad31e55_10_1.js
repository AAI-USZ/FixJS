function(){
    $("#zoomin").bind("click", zooming.zoomin);
    $("#zoomout").bind("click", zooming.zoomout);
    $("#pagecontainer").bind("mousedown", scrolling.mousedown);
    $("#pagecontainer").bind("mouseup", scrolling.mouseup);
    $("#pagecontainer").bind("mousemove", scrolling.mousemove);
    $("#pagecontainer").bind("mouseout", scrolling.mouseout);
    $("#pagecontainer").bind("click", hexgrid.onHexClicked);
    $(".shipclickable").bind("dblclick", shipManager.onShipDblClick);
    $(".shipclickable").bind("click", shipManager.onShipClick);
	$(".shipclickable").bind("mouseover", shipClickable.shipclickableMouseOver);
    $(".shipclickable").bind("mouseout", shipClickable.shipclickableMouseOut);
    $(document).bind("keyup", windowEvents.onKeyUp);
	
	
	
    
    
    
    $(".committurn").bind("click", gamedata.onCommitClicked);
    $(".cancelturn").bind("click", gamedata.onCancelClicked);
    
    hookEvent('pagecontainer', 'mousewheel', zooming.mouseWheel);
    document.onkeydown = function( event ){
        event = event || window.event;
        
    }
}