function(){
			this.table = new Y.DataTable({
				columns: [
					{key: 'name',				label: 'Index',				
						formatter: function(o){
							o.value = o.rowIndex+1;
						}													},
					{key: 'name', 				label: 'Resource Name',
							inlineEditor: 'InlineEditor',
							partialUpdate: true								},
					{key: 'email', 				label: 'Email Address',
							inlineEditor: 'InlineEditor',
							partialUpdate: true								},
					{key: 'startDate', 			label: 'Start Date',
							inlineEditor: 'InlineDateEditor',
							formatter: function(o){
						   		if (Y.Lang.isDate(o.data.startDate)) {
							   		o.value = Y.DataType.Date.format(o.data.startDate, {
							   			format: '%D'
							   		});	
						   		} else {
						   			o.value = '';
						   		}
					   		},
							partialUpdate: true								},
					{key: 'endDate', 			label: 'End Date',
							inlineEditor: 'InlineDateEditor',
							formatter: function(o){
						   		if (Y.Lang.isDate(o.data.endDate)) {
							   		o.value = Y.DataType.Date.format(o.data.endDate, {
							   			format: '%D'
							   		});	
						   		} else {
						   			o.value = '';
						   		}
					   		},
							partialUpdate: true								}
				],
				caption: 'Resources',
				recordType: Y.Resource,
				data: this.get('model').get('team')
			});
		}