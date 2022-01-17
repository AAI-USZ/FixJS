function() {
	var Commander = can.Model({
		findAll : 'GET /api/commanders',
		findOne : 'GET /api/commanders/{id}',
		create  : 'POST /api/commanders',
		update  : 'PUT /api/commanders/{id}',
		destroy : 'DELETE /api/commanders/{id}'
	}, {});

	var Main = can.Control({
		init: function(el, ops) {
			var self = this;

			can.view('//main.ejs', {
				commanders: Commander.findAll()
			})
			.then(function(frag) {
				self.element.html(frag);
			});
		},

		'.up click': function(el, ev) {
		},

		'.down click': function(el, ev) {
		}
	});

	new Main('#main');
}