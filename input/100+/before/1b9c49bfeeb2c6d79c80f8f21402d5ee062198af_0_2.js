function(tags, label, url) {
	var $items = $('<div id="hk_list" class="hk_list ui-widget ui-widget-content"><label>' + label + ' </label><input id="hk_items"></div>');
	var hk_taglist = [];
	for(var tname in tags){
		// create static array obects for autocomplete search
		 hk_taglist.push({label: tname, value: tags[tname]});
	}
	$('body').append($items.hide());
	$('#hk_items').autocomplete({
		source: hk_taglist,
		minLength : 0,
		position: { my : "center top", at: "center bottom" },
		focus: function(event, ui) { return false; },
		select: function(event, ui) {
			window.location = config.urls.admin + url + "?id=" + ui.item.value;
			return false;
		}
	})
	// set max height based on screen size
	var wheight = $(window).height()/100 * 73;
	$('body').find('.ui-menu').css({'maxHeight': wheight + "px"});
}