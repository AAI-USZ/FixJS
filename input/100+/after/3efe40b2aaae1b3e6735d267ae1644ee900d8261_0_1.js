function(from,to){
		log.debug('get past sla for: ' + this.sla_id,this.logAuthor)
		var post_params = [{id:this.sla_id,metrics:['cps_pct_by_state_0']}]
		Ext.Ajax.request({
			url: '/perfstore/values/' + from +'/'+ to ,
			params: {'nodes':Ext.JSON.encode(post_params)},
			scope: this,
			success: function(response) {
				var data = Ext.JSON.decode(response.responseText);
				data = data.data[0];
				
				this.buildReport(data);
			},
			failure: function(result, request) {
				log.error('Impossible to get sla informations on the given time period', this.logAuthor);
			}
		});
	}