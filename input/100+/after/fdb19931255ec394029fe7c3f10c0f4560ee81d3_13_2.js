function(doc, dt, dn) {
	var ListView = wn.views.ListView.extend({
		init: function(doclistview) {
			this._super(doclistview);
			this.fields = this.fields.concat([
				"`tabCommunication`.communication_date",
				"`tabCommunication`.category",
				"`tabCommunication`.subject",
				"`tabCommunication`.content"
			]);
			this.order_by = "`tabCommunication`.communication_date desc";
		},

		prepare_data: function(data) {
			this._super(data);
			this.prepare_when(data, data.creation);

			// escape double quote
			data.content = cstr(data.subject).replace(/"/gi, '\"')
				+ " | " + cstr(data.content).replace(/"/gi, '\"');

			if(data.content && data.content.length > 50) {
				data.content = '<span title="'+data.content+'">' +
					data.content.substr(0,50) + '...</span>';
			}

		},

		columns: [
			{width: '3%', content: 'docstatus'},
			{width: '15%', content: 'name'},
			{width: '15%', content: 'category'},
			{width: '55%', content: 'content'},
			{width: '12%', content:'when',
				css: {'text-align': 'right', 'color':'#777'}}		
		],
		
	});
	
	cur_frm.cscript.render_list(doc, 'Communication', cur_frm.communication_html,
		ListView, function(doctype) {
			var new_doc = LocalDB.create(doctype);
			new_doc = locals[doctype][new_doc];
			new_doc[doc.doctype.toLowerCase()] = doc.name;
			loaddoc(new_doc.doctype, new_doc.name);
		});
}