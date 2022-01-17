function() {
		var self = this;

		this.items = [
		    { html : "<div class='listTitle'>" + T('title.vehicle_runstatus') + "</div>"}, 
		    {
				xtype : 'container',
				flex : 1,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				items : [ 
				    this.zvehiclelist(self), 
				    {
						xtype : 'container',
						flex : 1,
						cls : 'borderRightGray',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						items : [ this.zrunstatus, this.zrunstatus_chart ]
					} 
				]
		    }
		],

		this.callParent();
			
		this.sub('vehicle_list').on('itemclick', function(grid, record) {
			var runStatusStore = self.sub('runstatus_grid').store;
			var proxy = runStatusStore.getProxy();
			proxy.extraParams.select = ['vehicle', 'month', 'month_str', 'run_dist', 'run_time', 'consmpt', 'co2_emss', 'effcc', 'eco_index', 'oos_cnt', 'mnt_cnt', 'mnt_time'];
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
		});
		
		this.sub('chart_panel').on('resize', function(panel, adjWidth, adjHeight, eOpts) {
			if(self.chartPanel) {				
				self.resizeChart();
			}
		});
		
		/**
		 * Vehicle Id 검색 조건 변경시 Vehicle 데이터 Local filtering
		 */
		this.sub('id_filter').on('change', function(field, value) {
			self.searchVehicles(false);
		});

		/**
		 * Vehicle Reg No. 검색 조건 변경시 Vehicle 데이터 Local filtering 
		 */
		this.sub('reg_no_filter').on('change', function(field, value) {
			self.searchVehicles(false);
		});
		
		/**
		 * combo_chart_type에 값을 기본값(column)을 설정
		 */
		this.sub('combo_chart_type').setValue('column');
		/**
		 * combo_chart에 값을 기본값(run_dist)을 설정
		 */
		this.sub('combo_chart').setValue('run_dist');
		/**
		 * combo_view에 값을 기본값(monthly_view)을 설정
		 */
		this.sub('combo_view').setValue('monthly_view');		
	}