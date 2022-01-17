function () {
				// The interval function may still be running during destroy, so check that the chart is really there before calling.
				if (chart && chart.tooltip) {
					chart.tooltip.tick();
				}
			}