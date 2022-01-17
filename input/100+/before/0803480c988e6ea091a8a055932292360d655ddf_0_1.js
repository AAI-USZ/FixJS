function(records, operation, success) {
		if (success) {
			for (var i = 0; i < records.length; i++) {
				var rg = Ext.ComponentQuery.query('#choicegroup-'+records[i].data['question_id'])[0];
				var bl = Ext.create('Ext.form.field.Radio', {
					boxLabel : records[i].data['text'],
					name : 'rb',
					inputValue : records[i].data['id']
				});
				rg.add(bl);
			};
		};
	}