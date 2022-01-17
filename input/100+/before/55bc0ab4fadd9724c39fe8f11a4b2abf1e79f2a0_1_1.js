function show_notification_dialog(type, message) {
    STYLE = {
	success: {
	    background: "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(240, 255, 200)), to(rgb(180, 255, 180)))",
	    color: "#2f7c00",
	    borderBottom: "1px solid #2f7c00"
	},
	error: {
	    background: "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(255, 240, 240)), to(rgb(255, 180, 180)))",
	    color: "#a20510",
	    borderBottom: "1px solid #a20510"
	}
    };
    var dialog = jQuery("div#message-dialog");
    if(dialog.size() == 0) {
	dialog = jQuery('<div id="message-dialog"></div>').appendTo(jQuery("body"));
	dialog.dialog({
	    autoOpen: false,
	    position: [0, 0],
	    width: "105%",
	    height: 51,
	    draggable: false,
	    resizable: false,
	    show: "blind",
	    hide: "blind"
	});
    }
    dialog.empty().append(jQuery("<p/>").css({textAlign:'center'}).text(message))
    dialog.siblings(".ui-dialog-titlebar:first").hide();
    dialog.parents(".ui-widget-content").css({background:"transparent", border: "none"});
    dialog.css(jQuery.extend({ padding: 0, font:"bold 14px arial", overflow: 'hidden', textShadow: '0 1px 0 #fff'}, STYLE[type]));
    dialog.dialog('open');
    setTimeout(function() {dialog.dialog('close'); }, 2500);
}