function(tags, label, url, type) {
	var $items = $('<div id="hk_list" class="hk_list ui-widget ui-widget-content"><label>' + label + ' </label><input id="hk_items"></div>');

	// if using type page, append template select
	if(type == 'page') {
		$select = $('<select id="hk_templateselect"></select>');
		$select.append('<option value=""> </option>');
		for(name in hkconf.hk_pwtemplates) {
			$select.append('<option value="'+ hkconf.hk_pwtemplates[name] +'">'+ name +'</option>');
		}
		$items.append($select);
	}

	if( typeof tags == "function" ) {
		// source can also be a callback that handles the remote source
		hk_source = tags;
	} else {
		var hk_source = [];
		for(var tname in tags){
			// create static array obects for autocomplete search
			hk_source.push({label: tname, value: tags[tname]});
		}
	}

	$('body').append($items.hide());
	$('#hk_items').autocomplete({
		// the source can also be a callback
		source: hk_source,
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