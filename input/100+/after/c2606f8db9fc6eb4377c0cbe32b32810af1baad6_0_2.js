function (req, res) {
// could be only edit, not change username else 404
		if ((req.session.info.role === "admin") || (req.body.name == req.session.info.name)) {
			var validator = new Validator();   
			validator.check(req.body.name, 'name').notEmpty();
			validator.check(req.body.email, 'email').isEmail();
			validator.check(req.body.role, 'role').notEmpty();
			validator.check(req.body.password, 'password').notEmpty();
			var errors = validator.getErrors();
			if (errors.length)
			{
				var message = {
					action: 'error', 
					reference: 'required',
					value: errors
				};
				var data = {
					form: {form_user: true, registration: true, restricted: true},
					type: 'user',
					name: req.body.name,
					role: req.body.role,
					email: req.body.email
				};
				utils.rendering(req.headers.host, 'user', data, req.session.info, req.session.lang, message, function callback(layout) {
					res.end(layout);
				});
			} else {
				var user_edit = new ModelsUser(req.headers.host);
				var shasum = crypto.createHash('sha1');
				shasum.update(req.body.password);

				var find = {
					name: req.body.name 
				}
				var value = {
					role: req.body.role,
					email: req.body.email, 
					password: shasum.digest('hex')
				};
				user_edit.update(find, value, function callbacks(results) {
					var data = {data_user: results};
					utils.rendering(req.headers.host, 'user', data, req.session.info, req.session.lang, {}, function callback(layout) {
						res.end(layout);
					});
				});
			}
		} else {
			var message = {
				action: 'error', 
				reference: 'notchange',
				value: ''
			};
			utils.rendering(req.headers.host, '404', {}, req.session.info, req.session.lang, {}, function callback(layout) {
				res.end(layout);
			});
		}
	}