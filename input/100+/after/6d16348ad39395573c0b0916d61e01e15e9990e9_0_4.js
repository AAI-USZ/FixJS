function(vehicleId, vehicleName, timeView, year, month) {
		
		if(!vehicleId) {
			vehicleId = this.vehicle;
			
			if(!vehicleId)
				return;
		}
		
		if(!timeView) {
			timeView = this.sub('combo_view').getValue();
		}
		
		var runStatusStore = this.sub('runstatus_grid').store;
		var proxy = runStatusStore.getProxy();
		proxy.extraParams.vehicle = vehicleId;
		proxy.extraParams.time_view = timeView;
		
		if(timeView == "monthly") {
			this.chartXTitle = "month";
			if(year == null) {
				proxy.extraParams.from_year = this.sub('from_year').getValue();
				proxy.extraParams.to_year = this.sub('to_year').getValue();
				proxy.extraParams.from_month = this.sub('from_month').getValue();
				proxy.extraParams.to_month = this.sub('to_month').getValue();
			} else {
				proxy.extraParams.from_year = year;
				proxy.extraParams.to_year = year;
				proxy.extraParams.from_month = 1;
				proxy.extraParams.to_month = 12;
			}					
		} else if(timeView == "daily") {
			this.chartXTitle = "date";
			proxy.extraParams.year = year;
			proxy.extraParams.month = month;
			
		} else if(timeView == "yearly") {
			this.chartXTitle = "year";
		}
				
		runStatusStore.load({
			scope : this,
			callback : function() {
				if(vehicleName) {
					this.setGridTitle(vehicleName);
				}
				this.refreshChart();
			}
		});		
	}