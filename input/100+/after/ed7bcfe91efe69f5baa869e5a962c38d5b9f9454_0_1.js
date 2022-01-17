function(){
	//$('.btn').button();
	// preload hourglass image
	$("<img>").attr("src", PATH_REL_CORE+'images/hourglass.png');
	//$("<img>").attr("src", PATH_REL_CORE+'images/utopia-systems-hover.png');

	$('form').append('<input type="submit" style="width:0;height:0;border:0;padding:0;margin:0;float:left;" />');

	$('li:first-child').addClass('first-child');
	$('li:last-child').addClass('last-child');

	$(".tabGroup").tabs();
	$(".tabGroup").bind('tabsshow', function(event, ui) { // bind after creation to stop immediate redirection to first hash
		var nodes = $(ui.tab.hash);
		nodes.removeAttr('id'); // remove ID to stop scrolling
		window.location.hash = ui.tab.hash;
		nodes.attr('id',ui.tab.hash.replace('#','')); // re-establish ID
	});
	
	$('th.sortable').live('click',function (e) {
		var fieldname = $(this).attr('rel');
		if (!fieldname) return;

		var arr = fieldname.split('|');

		var fieldname = arr[0];
		var mID = arr[1];
		var fullCurrent = gup('_s_' + mID);
		var currentSort = '';

		// if shift held, use the existing sort.
		if (e.shiftKey) currentSort = fullCurrent;
		// else if field is already in the filter, retain it.
		else if (fullCurrent.match(new RegExp(fieldname, 'i')) !== null) { currentSort = fullCurrent.match(new RegExp(fieldname+'( (ASC|DESC))?','i'))[0];}

		var order = {};
		// if blank, just add order
		if (!currentSort) {
			order['_s_'+mID] = fieldname;

		} else if (currentSort.match(new RegExp(fieldname+' ASC', 'i')) !== null) {
			// replace to DESC
			order['_s_'+mID] = currentSort.replace(new RegExp(fieldname+' ASC', 'i'),fieldname+' DESC');

		} else if (currentSort.match(new RegExp(fieldname+' DESC', 'i')) !== null) {
			// Replace to ASC
			order['_s_'+mID] = currentSort.replace(new RegExp(fieldname+' DESC', 'i'),fieldname);

		} else if (currentSort.match(new RegExp(fieldname, 'i')) !== null) {
			// append DESC
			order['_s_'+mID] = currentSort.replace(new RegExp(fieldname, 'i'),fieldname+' DESC');

		} else {
			// else append to end.
			order['_s_'+mID] = currentSort + ', '+fieldname;
		}
		ReloadWithItems(order);
	});

	$(window).bind("beforeunload", function(){ uf=null; });

	window.onscroll = function() {
		// Thanks to Johan SundstrÃ¶m (http://ecmanaut.blogspot.com/) and David Lantner (http://lantner.net/david)
		// for their help getting Safari working as documented at http://www.derekallard.com/blog/post/conditionally-sticky-sidebar
		if( window.XMLHttpRequest ) { // IE 6 doesn't implement position fixed nicely...
			$('#uPanel').css({'position':'fixed','top':0,'left':0});
		}
	}

	$('img.calendar_trigger').bind('click', function (event) {event.stopPropagation(); return true;});

	$("[name^=sql]").bind('keydown', function (event) {if ((event.charCode == '13' || event.keyCode == '13') && (!$(this).is('TEXTAREA'))) this.blur(); });
}