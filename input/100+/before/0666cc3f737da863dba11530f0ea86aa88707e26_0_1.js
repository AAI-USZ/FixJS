function(event) {
			$(event.currentTarget).closest(".logentry").toggleClass("active");
			return false;
		}