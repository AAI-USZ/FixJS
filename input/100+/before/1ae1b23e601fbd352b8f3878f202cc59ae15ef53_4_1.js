function(){
			this.table = new Y.DataTable({
				columns: [
					{key: 'name',				label: 'Index',				
						formatter: function(o){
							o.value = o.rowIndex+1;
						}													},
					{key: 'name', 				label: 'Resource Name'		},
					{key: 'email', 				label: 'Email Address'		},
					{key: 'startDate', 			label: 'Start Date'			},
					{key: 'endDate', 			label: 'End Date'			}
				],
				caption: 'Resources',
				recordType: Y.Resource,
				data: this.get('model').get('team')
			});
		}