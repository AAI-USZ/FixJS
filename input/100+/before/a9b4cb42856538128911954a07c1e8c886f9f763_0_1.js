function() {
		var jQuerytab_title_input = jQuery( "#tab_title"),
			jQuerytab_content_input = jQuery( "#tab_content" );
		var tab_counter = 2;

		// tabs init with a custom tab template and an "add" callback filling in the content
		var jQuerysubtabs = jQuery( "#subtabs").tabs({
			tabTemplate: "<li><a href='#{href}'>#{label}</a><span class='ui-icon ui-icon-close'>Remove Tab</span><span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
			add: function( event, ui ) {
				var tab_content = jQuerytab_content_input.val() || "Tab " + tab_counter + " content.";
				jQuery( ui.panel ).append( "<p>" + tab_content + "</p>" );
			}
		});

		// close icon: removing the tab on click
		// note: closable tabs gonna be an option in the future - see http://dev.jqueryui.com/ticket/3924
		jQuery( "#subtabs span.ui-icon-close" ).live( "click", function() {
			var index = jQuery( "li", jQuerysubtabs ).index( jQuery( this ).parent() );
			jQuerysubtabs.tabs( "remove", index );
		});
}