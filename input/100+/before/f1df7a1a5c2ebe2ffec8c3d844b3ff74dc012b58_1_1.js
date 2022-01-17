function(){
			var uri = '/data/tasks',
				cfg = {
					method: 'POST',
					headers: {
				        'Content-Type': 'application/json',
				    },
					data: Y.JSON.stringify({
							tasks: this.toJSON(),
							taskLastCount: Y.Task.lastCount,
							projectCalendar: Y.ProjectCalendar.data
						}),
					on: {
						start: function(transactionId, arguments){
							Y.log('Saving....');
						},
						
						complete: function(transactionId, response, arguments){
							Y.log('Done....');
						},
						
						success: function(transactionId, response, arguments){
							Y.fire('alert', {
								type: 'success',
								message: 'Schedule saved successfully.'
							})
						},
						
						failure: function(transactionId, response, arguments){
							Y.fire('alert', {
								type: 'error',
								message: 'Some problem occured in saving schedule details.'
							})
						},
						
						end: function(transactionId, arguments){
							
						}
					}/*,
					
					xdr: {use: 'native', dataType: 'text'}*/
				};
			Y.io(uri, cfg);
		}