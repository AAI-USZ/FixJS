function(feature) {
					if(this.tooltipDiv != null) {
						document.body.removeChild(this.tooltipDiv);
						this.tooltipDiv = null;
					}
					this.clickFeature(feature);
				}