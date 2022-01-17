function(grid, record) {
			var runStatusStore = self.sub('runstatus_grid').store;
			var proxy = runStatusStore.getProxy();
			proxy.extraParams.vehicle = record.data.id;
			proxy.extraParams.from_year = self.sub('from_year').getValue();
			proxy.extraParams.to_year = self.sub('to_year').getValue();
			proxy.extraParams.from_month = self.sub('from_month').getValue();
			proxy.extraParams.to_month = self.sub('to_month').getValue();
			runStatusStore.load({
				scope : self,
				callback : function() {					
					self.refreshChart();
				}
			});
		}