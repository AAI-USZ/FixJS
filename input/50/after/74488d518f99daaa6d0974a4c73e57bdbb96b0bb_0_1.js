function(error){
			if (error.code === 'notfound')
				res.send("Slider '" + sliderName + "' NOT FOUND", 404);
			else res.send(error.toString(), 500);
		}