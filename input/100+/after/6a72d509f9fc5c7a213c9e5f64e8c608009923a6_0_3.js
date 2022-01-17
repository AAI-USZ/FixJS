function(msg, callBack) {     
	var dialog = new YAHOO.widget.SimpleDialog("simpledialog", 
			 { width: "300px",
			   fixedcenter: true,
			   visible: false,
			   draggable: false,
			   close: true,
			   text: msg,
			   icon: YAHOO.widget.SimpleDialog.ICON_HELP,
			   constraintoviewport: true,
			   buttons: [ { text:"Yes", handler: function() { this.hide(); callBack();} , isDefault:true },
						  { text:"No",  handler: function(){ this.hide(); } } ]
			 } );    
    dialog.render("jmailcenter");    
    dialog.show();
}