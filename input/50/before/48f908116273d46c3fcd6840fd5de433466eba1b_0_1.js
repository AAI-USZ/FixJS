function(m) 
			{
				cLog("Successfully sent AJAX request from getMovies");
				PMM.Movies._page++;
				PMM.Movies.processMovies(m, callback);
			}