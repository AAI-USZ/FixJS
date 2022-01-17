function(){

	ce.attachEvent( nl.windgazer.COMIC_EVENT_ID, function( eid, data ) {
		
		console.log("Reacting to " + nl.windgazer.COMIC_EVENT_ID + " event.");
		
		nl.windgazer.Reader.setEntry( data.entry );
		nl.windgazer.Reader.setComic( data.comic );

		document.getElementById("comicImage").src = data.entry.getImgURL();

	} );

	function fetchPrevious() {
		var r = nl.windgazer.Reader, c = r.getComic(), e = r.getEntry();
		if ( e.getPrevURL(  ) ) {
			c.fetchByURL ( e.getPrevURL(  ) );
		}
	}

	function fetchNext() {
		var r = nl.windgazer.Reader, c = r.getComic(), e = r.getEntry();
		if ( e.getNextURL(  ) ) {
			c.fetchByURL ( e.getNextURL(  ) );
		}
	}

	LinkListener.addHandler( "prevEntry", fetchPrevious );

	LinkListener.addHandler( "nextEntry", fetchNext );

	LinkListener.addHandler( "switchComic", function() {
		var c = nl.windgazer.Reader.getComic();
		if ( c && c.getId() == PennyArcadeReaderComic.getId() ) {
			GirlGeniusReaderComic.fetchLast(  );
		} else {
			PennyArcadeReaderComic.fetchLast(  );
		}
	} );

	function screenEdgeEventHandler( e ) {
		e = e ? e : window.event;
		var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 30;
		var body = document.getElementsByTagName("body")[0];

		if ( wheelData > 0 && window.scrollY <= 0 ) {
			if (wheelData > 6) {
				if ( Options.isDebug() ) console.debug( "Show top menu" );
				body.className += " menuEnabled";
			}
		} else if ( wheelData < 0 ) {
			if ( Options.isDebug() ) console.debug( "Hide top menu" );
			body.className = body.className.replace(/ ?\bmenuEnabled\b/g, "");
		}
	}

	Events.attach( window, "mousewheel", screenEdgeEventHandler );
	Events.attach( window, "DOMMouseScroll", screenEdgeEventHandler );

	function selectNewComic() {
		var cs = document.getElementById("comicSelector");
		var o = cs.options[ cs.selectedIndex ]
		var id = o.value;
		var c = Comics.getComic( id ); 

		c.fetchLast();
	}

	Events.attach( window, "load", function() {

		var comics = Comics.getComics(),
			cs = document.getElementById("comicSelector");
		
		for (var i = 0; i < comics.length; i++) {
			var c = comics[i];
			cs.options[i] = new Option(c.getTitle(), c.getId(), i==0, i==0);
		}
		
		Events.attach( cs, "change", selectNewComic );

	});

}