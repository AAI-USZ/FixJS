function() {



		var nPeaks = 6;

		var width = 10;

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

	}