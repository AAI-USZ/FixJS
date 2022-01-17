function layout() {
	switch (state) {
		case States.Start:
			$("#dish").position({
				of: $("#left"),
				my: "center center",
				at: "center center"
			});

			for (var i = 0; i < COIN_VALUES.length; i++) {
				for (var j = 0; j < START_COIN_QUANTITY; j++) {
					var coin = createCoin(COIN_VALUES[i]);
					var stack = $("#dish");

					$(".stack").each(function() {
						if (parseInt($(this).attr("data-value")) == COIN_VALUES[i]) {
							stack = $(this);
							return;
						}
					});

					coin.appendTo(stack);

					coin.position({
						of: stack,
						my: "center center",
						at: "center center"
					});

					coin.css("visibility", "hidden");
				}
			}

			setCurrentStamp(createStamp(6));
	}

	showTopCoinInStacks();
}