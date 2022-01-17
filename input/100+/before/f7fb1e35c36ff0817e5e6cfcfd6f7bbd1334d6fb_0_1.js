function buildSpendingTimeStep() {
		var minutes = [ 5, 10, 15, 30, 45, 60 ];
		var ul = $("<ul class='buttons' />");
		$(minutes).each(function(i, minute) {
			ul.append(
				drawButton( "images/icon_" + minute + "min.png",
					minute + " Minutos",
					function () {
						userProfile.spendingTime = minute;
						navigation.showNextStep();
					})
			 );
		});

		return $("<div />").append(
			$('<h2>' + loadedData.steps[0] + '</h2>'), ul
		);
	}