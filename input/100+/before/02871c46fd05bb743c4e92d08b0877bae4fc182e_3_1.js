function(tooltip, thumb, mediaType)
{
	var mediaTypes  = this.getMediaTypes(thumb) ;
		
	// if multi-media display toolbar
		
	var that = this;
	if ( mediaTypes.count > 1 )
	{
		$('.tooltip-toolbar', tooltip).remove() ;
		var tb = $('<div/>', { "class": "tooltip-toolbar" }).appendTo(tooltip) ;
			
		for ( var i=0 ; i<mediaTypes.types.length ; i++ )
		{
			mtype = mediaTypes.types[i] ;
			
			var btn = $('<a/>', { href: "javascript:void(0)", "id": mtype, "class": (( mtype == mediaType ) ? ' selected': '') }).appendTo(tb) ;
			
			btn.click(function() {
				var thisMediaType = this.id ;
										
				var current = $('.media-preview', tooltip) ;
					
				var currentId = current.attr('id') ;
					
				if ( currentId != thisMediaType )
				{
					current.remove() ;
					that.renderContents(tooltip, thumb, thisMediaType) ;
					$(this).toggleClass('selected') ;
				//	$('a#' + currentId, tooltip).toggleClass('selected') ;
				}
				
				return false ;
			}) ;
		}
	}
		
	
	
	$('.media-preview', tooltip).remove() ;
	var tooltipContents = $('<div/>', { "class": "media-preview", "id": mediaType  }).appendTo(tooltip) ;
	
	var desc = ThumbContainer.selectTooltipText(thumb.doc) ;
			
		//	mediaType = "Object3D" ;
	// currently for the following media types I do a slide show of preview images
	if ( mediaType == "ImageType" ||  mediaType == "Object3D" || mediaType == "VideoType" )
	{
		var imageUrls = [] ;
		
		var slideShow = $('<div/>', { "id": "slides"} ).appendTo(tooltipContents) ;
		var slideContainer = $('<a/>', { "class": "slides-container", css: { width: tooltip.width() }, "href": "javascript:void(0)"})
		.appendTo(slideShow)
		.click(function() {
				that.renderDocument(thumb.doc, mediaType) ;
		}) ;		
		
				
		for( var i=0 ; i<thumb.doc.media.length ; i++ )
		{
			var media = thumb.doc.media[i] ;
			
			if ( mediaType != media.type ) continue ;
		
			if ( media.type  == "ImageType" || media.type == "Object3D" || media.type == "VideoType")
			{
				for(var j=0 ; j<media.previews.length ; j++ )
				{
					var preview = media.previews[j] ;
				
				/*	if ( ! /^image\//.test(preview.format) ) continue ; */
				
					imageUrls.push(preview.url) ;
					
					var cntSlide = $('<div/>', { "class": "slide", 
						css: { width: tooltip.width() + 'px', height: tooltip.width() + 'px', 'line-height': tooltip.width() + 'px', 'text-align': 'center' }
					}).appendTo(slideContainer) ;
					
					var slide = $("<img/>", { load: function() {
						if ( this.width < this.height )
							$(this).attr('height', '100%') ;
						else
							$(this).attr('width', '100%') ;
						},
					src: preview.url,
					css: { 'vertical-align' : 'middle'}}).appendTo(cntSlide) ;
					
				}
			}
		}
		

		slideShow.slides({
				preload: true,
				container: 'slides-container',
				pagination: true,
				effect: 'fade, slide',
				crossfade: 'true',
				preloadImage: '',
				play: 500,
				pause: 2500
				}) ;
		
	}
	else if ( mediaType == "SoundType" )
	{
		for( var i=0 ; i<thumb.doc.media.length ; i++ )
		{
			var media = thumb.doc.media[i] ;
			
			if ( mediaType != media.type ) continue ;
			
			var urlOgg, urlMp3, urlPng, urlSvg, urlJpg, urlImg ;
			
			for(var j=0 ; j<media.previews.length ; j++ )
			{
				var  preview = media.previews[j] ;
				
				if ( preview.format == "image/png" ) urlPng = preview.url ;
				else if ( preview.format == "image/jpg" ||  preview.format == "image/jpeg" ) urlJpg = preview.url ;
				else if ( preview.format == "image/svg+xml" ) urlSvg = preview.url ;
				else if ( preview.format == "audio/mpeg" ) urlMp3 = preview.url ;
				else if ( preview.format == "audio/ogg" ) urlOgg = preview.url ;
				else if ( preview.format == "" ) urlUnknown = preview.url ;
			}
			
			if ( urlSvg && Modernizr.svg ) urlImg = urlSvg ;
			else if ( urlPng ) urlImg = urlPng ;
			else if ( urlJpg ) urlImg = urlJpg ;
			else if ( urlUnknown ) urlImg = urlUnknown ;
			
			
			var anim = $('<div/>', { css: { width: tooltip.width() }}).appendTo(tooltipContents) ;
			var audioRdr = new AudioRenderer(anim, urlMp3, urlOgg, urlImg, media.url, "flower", thumb.doc.startTime) ;
			
			$("#audiovis", anim).click(function() {
				that.renderDocument(thumb.doc, mediaType) ;
			}) ;
			
			
			tooltip.bind('thide', function() { 
				audioRdr.terminate() ; 
			}) ;
		
			break ;
		}
		
	}
	
	if(desc) {
	  $('<p/>', { css: { "float": "left", "max-height": "60px", "overflow": "hidden", "text-overflow": "ellipsis"}, text: desc}).appendTo(tooltipContents);
	}
	
	/**
	 * Triantafillos:
	 * reverse geocode location of object and display it in the tooltip
	 * if location is given as query, compute distance with object and display it in the tooltip
	 */
	if (thumb.doc.rw.pos) {
	  var location =  new google.maps.LatLng(thumb.doc.rw.pos.coords.lat, thumb.doc.rw.pos.coords.lon);
	  var geocoder = new google.maps.Geocoder();
	  geocoder.geocode({'latLng': location}, function(results, status) {
	  
	    if (status == google.maps.GeocoderStatus.OK) {
	      tooltipContents.append("<br><p>Location: "+results[0].formatted_address+"</p>");
		}
		else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
	      tooltipContents.append("<br><p>Location: no address for the coordinates: ("+thumbLatitude+","+thumbLongitude+")</p>");
	    }
		
		if($("#queryContainer .Location").length) {
		  var currentLatitude = $("#queryContainer .Location").attr('title').split(" ")[0];
		  var currentLongitude = $("#queryContainer .Location").attr('title').split(" ")[1];
		  var R = 6371;
		  var dLat = (currentLatitude-thumbLatitude) *  Math.PI / 180;
		  var dLon = (currentLongitude-thumbLongitude) *  Math.PI / 180;
		  var lat1 = thumbLatitude *  Math.PI / 180;
		  var lat2 = currentLatitude *  Math.PI / 180;
		  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  var distance = R * c;
		  tooltipContents.append("<p>Distance: "+distance.toFixed(3)+" km</p>");
		}
	  });
	}
	else tooltipContents.append("<br><p>Location: unavailable</p>");
}