function() {
		$("#sound").bind("change", function() { pushPopUi.setSound($(this).val() != "off"); } );
		$("#shapes").bind("change", function() { pushPopUi.setShapes($(this).val()); } );
		$("#difficulty").bind("change", function() {
			var difficulty = $(this).val();
			if (!pushPopUi.premium && (difficulty == "harder" || difficulty == "insane")) {
				pushPopUi.showPremiumDLPage();
			} else if (pushPopUi.levelsEnabled.indexOf(difficulty) > -1) {
				pushPopUi.setDifficulty(difficulty);
				setTimeout( function() { pushPopUi.resetPuzzle(); }, 250); 
			} else {
				pushPopUi.showLockedLevelPage();
			}
		} );
		if (!pushPopUi.premium) {
			$("#difficulty-menu li[data-option-index=3]").removeClass("ui-btn-up-b").addClass("ui-btn-up-c");
			$("#difficulty-menu li[data-option-index=4]").removeClass("ui-btn-up-b").addClass("ui-btn-up-c");
			
			for (var i=0; i < PushPop.DIFFICULTIES.length; i++) {
				if (pushPopUi.levelsEnabled.indexOf(PushPop.DIFFICULTIES[i]) == -1) {
					$("#difficulty-menu li[data-option-index="+(i)+"]").addClass("disabled");
				}
			}
		}
	}