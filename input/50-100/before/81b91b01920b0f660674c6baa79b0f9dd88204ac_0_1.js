function () {
			var plansUpdated = 0;
			for (var planKey in this.plans) {
				this.plans[planKey].update().addOnce(function () {
					plansUpdated++;
					if (plansUpdated === this.plansCount) {
						this.updateFinished.dispatch();
					}
				}, this);
			}
		}