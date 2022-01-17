function buildThemeChooserPanel() {
		var ul = $("<ul class='buttons' />");
		var themeList = loadedData.data[userProfile.geekType].themes;

		$(themeList).each(function(i, theme){
			ul.append(
				drawButton(
				 	theme.imageUrl,
				 	theme.name,
				 	function (){
						userProfile.themeId = theme.id;
						navigation.showNextStep();
					}
				)
			 );
		});

		return $("<div />").append(
			$('<h2>' + loadedData.steps[0] + '</h2>'), ul
		);
	}