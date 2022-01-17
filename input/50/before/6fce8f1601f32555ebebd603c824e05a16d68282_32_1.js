function () {
					plansUpdated++;
					if (plansUpdated == this.plansCount) {
						this.updateFinished.dispatch();
					}
				}