function() {



		var nPeaks = PLANET2_PEAKS;

		var width = PLANET2_PEAK_WIDTH;

		var peak;

		var arr;

		

		this.generateEmptyPlanet();

		

		// choose the initial peaks

		for (var i = 0; i < nPeaks; i++) {

		

			arr = Array(width);

		

			peak = i*Math.floor(nColumns/nPeaks);

			_midpointDispl(arr, 0, width, 1, 0.9);

			

			for(var j=0; j<width; j++) {

				for(var z=0; z<arr[j]; z++) {

					this.columns[peak+j][z] = 1;

				}

			}

		}



		// place the cannons

		var placedCannons = 0;

		

		while (placedCannons < PLANET2_CANNONS) {



			var candidateCannon;

			do {

				candidateCannon = Math.floor(Math.random() * nColumns);	

			} while(this.canPlaceCannon(candidateCannon));

			

			



			placedCannons++;



			

		}

		

	}