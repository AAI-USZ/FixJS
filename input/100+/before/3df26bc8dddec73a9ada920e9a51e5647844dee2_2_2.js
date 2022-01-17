function olMain() {

	var layerhtml, styleType;

 	runHook("olMain", FBEFORE);



	if (o3_background!="" || o3_fullhtml) {

		// Use background instead of box.

		layerhtml = runHook('ol_content_background', FALTERNATE, o3_css, o3_text, o3_background, o3_fullhtml);

	} else {

		// They want a popup box.

		styleType = (pms[o3_css-1-pmStart] == "cssoff" || pms[o3_css-1-pmStart] == "cssclass");



		// Prepare popup background

		if (o3_fgbackground != "") o3_fgbackground = "background=\""+o3_fgbackground+"\"";

		if (o3_bgbackground != "") o3_bgbackground = (styleType ? "background=\""+o3_bgbackground+"\"" : o3_bgbackground);



		// Prepare popup colors

		if (o3_fgcolor != "") o3_fgcolor = (styleType ? "bgcolor=\""+o3_fgcolor+"\"" : o3_fgcolor);

		if (o3_bgcolor != "") o3_bgcolor = (styleType ? "bgcolor=\""+o3_bgcolor+"\"" : o3_bgcolor);



		// Prepare popup height

		if (o3_height > 0) o3_height = (styleType ? "height=\""+o3_height+"\"" : o3_height);

		else o3_height = "";



		// Decide which kinda box.

		if (o3_cap=="") {

			// Plain

			layerhtml = runHook('ol_content_simple', FALTERNATE, o3_css, o3_text);

		} else {

			// With caption

			if (o3_sticky) {

				// Show close text

				layerhtml = runHook('ol_content_caption', FALTERNATE, o3_css, o3_text, o3_cap, o3_close);

			} else {

				// No close text

				layerhtml = runHook('ol_content_caption', FALTERNATE, o3_css, o3_text, o3_cap, "");

			}

		}

	}



	// We want it to stick!

	if (o3_sticky) {

		if (o3_timerid > 0) {

			clearTimeout(o3_timerid);

			o3_timerid = 0;

		}

		o3_showingsticky = 1;

		o3_removecounter = 0;

	}



	// Created a separate routine to generate the popup to make it easier

	// to implement a plugin capability

	if (!runHook("createPopup", FREPLACE, layerhtml)) return false;



	// Prepare status bar

	if (o3_autostatus > 0) {

		o3_status = o3_text;

		if (o3_autostatus > 1) o3_status = o3_cap;

	}



	// When placing the layer the first time, even stickies may be moved.

	o3_allowmove = 0;



	// Initiate a timer for timeout

	if (o3_timeout > 0) {

		if (o3_timerid > 0) clearTimeout(o3_timerid);

		o3_timerid = setTimeout("cClick()", o3_timeout);

	}



	// Show layer

	runHook("disp", FREPLACE, o3_status);

	runHook("olMain", FAFTER);



	return (olOp && event && event.type == 'mouseover' && !o3_status) ? '' : (o3_status != '');

}