function refreshActivation() {
		if (isPasswordValid()) {
			$('#activationButton').removeClass("invisible");
		} else {
			$('#activationButton').addClass("invisible");
		}

		if (chrall.compteChrallActif()) {
			$('#activationButton').text("Désactiver le compte");
		} else {
			$('#activationButton').text("Activer le compte");
		}
	}