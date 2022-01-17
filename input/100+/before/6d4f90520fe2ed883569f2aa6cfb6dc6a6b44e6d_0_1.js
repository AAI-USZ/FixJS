function(i){
				NagUI.log(i.data);
				var newc=t.add(
					{
						xtype: 'panel',
						layout: 'border',
						title: i.get('peer_name'),
						iconCls: (i.data.error_code ? 'x-tree-problem' : undefined),
						items:[
							Ext.create('Ext.grid.property.Grid',{
								region: 'center',
								source:i.data,
								nameColumnWidth:220,
								tbar:[
								{
									text: 'Actions',
									menu:{
										items:[
											{
												text:'Enable Notifications',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'ENABLE_NOTIFICATIONS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Disable Notifications',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'DISABLE_NOTIFICATIONS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Start Executing Host Checks',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'START_EXECUTING_HOST_CHECKS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Stop Executing Host Checks',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'STOP_EXECUTING_HOST_CHECKS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Start Executing Service Checks',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'START_EXECUTING_SVC_CHECKS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Stop Executing Service Checks',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'STOP_EXECUTING_SVC_CHECKS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Start Accepting Passive Service Checks',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'START_ACCEPTING_PASSIVE_SVC_CHECKS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Stop Accepting Passive Service Checks',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'STOP_ACCEPTING_PASSIVE_SVC_CHECKS9';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text:'Enable Event Handlers',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'ENABLE_EVENT_HANDLERS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Disable Event Handlers',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'DISABLE_EVENT_HANDLERS';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Enable Performance Data Processing',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'ENABLE_PERFORMANCE_DATA';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Disable Performance Data Processing',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'DISABLE_PERFORMANCE_DATA';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											},
											{
												text: 'Send Restart Cmd',
												handler:function(){
													var str='COMMAND ['+ new Date().format('U') + '] ' + 'RESTART_PROGRAM';
													sendNagiosCommand(str,'GET',t.getActiveTab().title);
												}
											}
										]
									}									
								}
								]
							})
						]
					}
				);
				if(i.data.error_code)
				{
					newc.getEl().mask('Nagios Server Status error: ' + i.data.error_str);
				}		
			}