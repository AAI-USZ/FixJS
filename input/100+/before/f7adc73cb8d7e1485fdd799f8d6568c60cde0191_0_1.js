function() {
		var dishCoinValue = coinsInDish.sum();
		var dishStampValue = stampsInDish.sum();

		if (dishCoinValue == stampPrice) {
			return "You don't want to spend more money than you need to." +
				"<br/><br/>Is there something other way to pay for the stamp?";
		}

		if (dishCoinValue + dishStampValue > stampPrice) {
			var string = "That's a bit too much. Try removing some ";

			if (dishStampValue > 0 && dishCoinValue > 0) {
				string += "coins or stamps";
			} else if (dishCoinValue > 0) {
				string += "coins";
			} else if (dishStampValue > 0) {
				string += "stamps";
			}

			string += " from the dish.";

			return string;
		}

		return null;
	}