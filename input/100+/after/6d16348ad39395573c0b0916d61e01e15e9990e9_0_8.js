function() {
				if(driverName) {
					this.setGridTitle(driverName);
				}
				
				if(year && month) {
					this.setChartTitle(year + '-' + month);
				}
				
				this.refreshChart();
			}