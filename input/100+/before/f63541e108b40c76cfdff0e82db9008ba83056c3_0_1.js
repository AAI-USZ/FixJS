function(datas){
		log.debug('OnRefresh', this.logAuthor)
		this.wcontainer.removeAll()

		for (var i in datas){
			data = datas[i]

			console.log(data)

			this.selector_record = data

			sla_id = 'sla.engine.sla.resource.' + data.component + '.sla'
			log.debug('Searching sla resource: ' + sla_id, this.logAuthor)

			Ext.Ajax.request({
				url: '/rest/events/event/' + sla_id,
				scope: this,
				success: function(response) {
					var data = Ext.JSON.decode(response.responseText);

					data = data.data[0];

					this.build(data);
				},
				failure: function(result, request) {
					log.error('Impossible to get Node informations, Ajax request failed ... ('+ request.url + ')', this.logAuthor);
				}
			});
		}
	}