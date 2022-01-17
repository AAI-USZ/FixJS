function planFinished() {
				plansUpdated++;
				if (plansUpdated === this.plansCount) {
					this.updateFinished.dispatch();
				}
			}