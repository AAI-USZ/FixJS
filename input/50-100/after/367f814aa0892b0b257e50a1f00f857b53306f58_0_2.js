function(feature) {
					if(feature.fid in this.map.tooltips) {
						document.body.removeChild(this.map.tooltips[feature.fid]);
						delete this.map.tooltips[feature.fid];
					}
					this.clickFeature(feature);
				}