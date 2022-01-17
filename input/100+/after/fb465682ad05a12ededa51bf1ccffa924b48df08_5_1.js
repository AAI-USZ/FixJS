function() {

		var comics = Comics.getComics(),
			cs = document.getElementById("comicSelector");
		
		for (var i = 0; i < comics.length; i++) {
			var c = comics[i];
			cs.options[i] = new Option(c.getTitle(), c.getId(), i==0, i==0);
		}
		
		Events.attach( cs, "change", selectNewComic );
		
		var ci = document.getElementById("comicImage");
		Events.attach( ci, "load", function() {

			ce.fireEvent( nl.windgazer.COMIC_FINISHED_LOADING, ci );

		});

	}