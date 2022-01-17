function (args) {

		/* args.position, args.title, args.subtitle, args.place-(everything from autocompleter), args.icon, args.popbubble */
		var ratingcontainer = "";
		if (!args.icon) {args.icon = "Map-Marker-Push-Pin-2-Right-Red-icon.png"}; //default marker icon
		var image = new google.maps.MarkerImage('images/' + args.icon,
		new google.maps.Size(64, 64),
		new google.maps.Point(0, 0), // origin
		new google.maps.Point(31, 62), // anchor
		new google.maps.Size(64, 64) //scaled size
		);

		var marker = new google.maps.Marker(
		{
		  position: args.position,
		  map: this.map,
		  icon: image,
		  animation: google.maps.Animation.DROP,
		  //draggable: true,
		  optimized: this.optimizedmarkers,
		  title:"Marker"
		}
		);

  	// push all information from autocompleter to marker.place
  	var place = args.place;
  	
	
	//pan and zoom not for dropped pins and without poping bubble
	if (args.action != "droppin" && args.popbubble) {
		this.map.setZoom(14);
		this.map.setCenter(args.position);
	};
	
	if (place.rating) {
		ratingcontainer = '<div class="rating-container" id="rating-container" style="padding-right: 7px; padding-left: 0px; margin-top: 5px; float:left;"><div class="rating_bar"><div id="ratingstar" style="width:' + place.rating*20 + '%"></div></div></div>';
		};

 	//--> Define the infoBubble
	var infoBubble = new InfoBubble({
		map: this.map,
		//content: '<div id="bubble" class="phoneytext">' + args.title + '<div class="phoneytext2">' + args.subtitle + '</div></div>',
		content: '<div id="bubble" class="phoneytext">' + args.title + '<div class="phoneytext2">' + args.subtitle + '<br>' + ratingcontainer + '</div>',
		shadowStyle: 1,
		padding: 0,
		backgroundColor: 'rgb(57,57,57)',
		borderRadius: 4,
		arrowSize: 10,
		borderWidth: 1,
		borderColor: '#2c2c2c',
		disableAutoPan: true,
		hideCloseButton: true,
		arrowPosition: 30,
		backgroundClassName: 'phoney',
		backgroundClassNameClicked: 'phoney-clicked',
		arrowStyle: 2,
		onClick: function(){
			//--> Start the marker bouncing so they know it was clicked
			marker.setAnimation(google.maps.Animation.BOUNCE);
			this.markerBubbleTap({marker: marker, infoBubble: infoBubble, title: args.title, subtitle: args.subtitle, place: place});
			/*
			//--> Fire off the next display
			(function(){
				var e = {};
				e.item = params;
				this.listTapHandler(e);
			}).bind(this).delay(0.75);
			*/

			//--> Stop bouncing the marker after 2 second
			(function(){
				marker.setAnimation(null);
			}).bind(this).delay(2);
		}.bind(this)
	});

	//google.maps.event.addListener(marker,"click",this.toggleInfoBubble.bind(this, infoBubble, marker));

	// show the bubble after 1 second
	this.MayBubblePop = true;

	if (args.popbubble) {
	(function(){
				this.toggleInfoBubble(infoBubble, marker);
			}).bind(this).delay(1);
	};

	//Add it to the array	
	marker.place = place; //add place array to the marker, because of pushing to other scenes
	infoBubble.id = place.id; //mark the infoBubble with the same ID as marker for further removing
	
	google.maps.event.addListener(marker,"click",this.toggleInfoBubble.bind(this, infoBubble, marker));
	
	//Add it to the array
	infoBubbles.push(infoBubble);
	markers.push(marker);

	//this.hideStatusPanel();

}