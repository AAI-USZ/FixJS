function(){
    $("#zoomin").on("click", zooming.zoomin);
    $("#zoomout").on("click", zooming.zoomout);
    //$("#pagecontainer").bind("mousedown", scrolling.mousedown);
    //$("#pagecontainer").bind("mouseup", scrolling.mouseup);
    //$("#pagecontainer").bind("mousemove", scrolling.mousemove);
    //$("#pagecontainer").bind("mouseout", scrolling.mouseout);
    $("#pagecontainer").on("click", hexgrid.onHexClicked);
    $(".shipclickable").on("dblclick", shipManager.onShipDblClick);
    $(".shipclickable").on("click", shipManager.onShipClick);
	$(".shipclickable").on("mouseover", shipClickable.shipclickableMouseOver);
    $(".shipclickable").on("mouseout", shipClickable.shipclickableMouseOut);
    $(document).on("keyup", windowEvents.onKeyUp);
	
	
	
    
    
    
    $(".committurn").on("click", gamedata.onCommitClicked);
    $(".cancelturn").on("click", gamedata.onCancelClicked);
    
    hookEvent('pagecontainer', 'mousewheel', zooming.mouseWheel);
    document.onkeydown = function( event ){
        event = event || window.event;
        
    }
}