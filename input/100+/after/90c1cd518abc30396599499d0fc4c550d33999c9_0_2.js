function(event) {
		this._selectedFeature = event.feature;
		// Pre-fetch the background image for the popup so that it is 
		// fetched from the cache when when popup is displayed
		var popupBgImage = new Image();
		popupBgImage.src = OpenLayers.Util.getImagesLocation() + 'cloud-popup-relative.png';

		zoom_point = event.feature.geometry.getBounds().getCenterLonLat();
		lon = zoom_point.lon;
		lat = zoom_point.lat;

		var thumb = "";
		if (typeof(event.feature.attributes.thumb) != 'undefined' && 
			event.feature.attributes.thumb != '') {
			thumb = "<div class=\"infowindow_image\"><a href='"+event.feature.attributes.link+"'>";
			thumb += "<img src=\""+event.feature.attributes.thumb+"\" height=\"59\" width=\"89\" /></a></div>";
		}

		var content = "<div class=\"infowindow\">" + thumb +
		    "<div class=\"infowindow_content\">"+
		    "<div class=\"infowindow_list\">"+event.feature.attributes.name+"</div>\n" +
		    "<div class=\"infowindow_meta\">";

		if (typeof(event.feature.attributes.link) != 'undefined' &&
		    event.feature.attributes.link != '') {

		    content += "<a href='"+event.feature.attributes.link+"'>" +
			    "More Information</a><br/>";
		}

		content += "<a id=\"zoomIn\">";
		content += "Zoom In</a>";
		content += "&nbsp;&nbsp;|&nbsp;&nbsp;";
		content += "<a id=\"zoomOut\">";
		content += "Zoom Out</a></div>";
		content += "</div><div style=\"clear:both;\"></div></div>";		

		if (content.search("<script") != -1) {
			content = "Content contained Javascript! Escaped content " +
			    "below.<br />" + content.replace(/</g, "&lt;");
		}
		  
		// Destroy existing popups before opening a new one
		if (event.feature.popup != null) {
			map.removePopup(event.feature.popup);
		}

		// Create the popup
		var popup = new OpenLayers.Popup.FramedCloud("chicken", 
			event.feature.geometry.getBounds().getCenterLonLat(),
			new OpenLayers.Size(100,100),
			content,
			null, true, this.onPopupClose);

		event.feature.popup = popup;
		this._olMap.addPopup(popup);
		popup.show();

		// Register zoom in/out events
		$("#zoomIn", popup.contentDiv).click(
			{context: this, latitude: lat, longitude: lon, zoomFactor: 1}, 
			this.zoomToSelectedFeature);

		$("#zoomOut", popup.contentDiv).click(
			{context: this, latitude: lat, longitude: lon, zoomFactor: -1}, 
			this.zoomToSelectedFeature);
	}