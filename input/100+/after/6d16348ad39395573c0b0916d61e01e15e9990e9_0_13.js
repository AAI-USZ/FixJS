function() {
				if(vehicleName) {
					this.setGridTitle(vehicleName);
				}
				
				if(year && month) {
					this.setChartTitle(year + '-' + month);
				}
				
				this.refreshChart();
			}