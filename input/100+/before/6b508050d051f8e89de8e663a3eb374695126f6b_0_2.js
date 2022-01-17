function (req, res) { 
		var validator = new Validator();   
		validator.check(req.body.email, 'email').isEmail();
		validator.check(req.body.firstname, 'name').notEmpty();
		validator.check(req.body.surname, 'name').notEmpty();
		validator.check(req.body.password, 'password').notEmpty();
		var errors = validator.getErrors();

		// get data from cache for the site
	        var site = cache.get(req.headers.host), public_key, private_key;
		site.forEach( function (row) {
			if (row.type === "information") {
				private_key = row.captcha_private_key;
				public_key = row.captcha_public_key;
			}
		});
    		var data = {
        		remoteip:  req.connection.remoteAddress,
        		challenge: req.body.recaptcha_challenge_field,
       			response:  req.body.recaptcha_response_field
    		};

    		var recaptcha = new Recaptcha(public_key, private_key, data);
		recaptcha.verify(function(success, error_code) {
			if (errors.length || !success)
			{
				if (!success) {
					errors.push("captcha");
				}
				var message = {
					action: 'action-error', 
					reference: 'required',
					value: errors
				};
				var data = { 
					name: req.body.name,
					email: req.body.email
				};
				// get data from cache for the site
		        	var site = cache.get(req.headers.host), public_key, private_key;
				site.forEach( function (row) {
					if (row.type === "information") {
						private_key = row.captcha_private_key;
						public_key = row.captcha_public_key;
					}
				});
				// create and inizialize captcha
				var recaptcha = new Recaptcha(public_key, private_key);
				data.captcha = recaptcha.toHTML();
				utils.rendering(req.headers.host, 'registration', data, req.session.info, req.session.lang, message, function callback(layout) {
					res.end(layout);
				});
			} else {
				// ONLY ONE USERNAME
				var user_check = new ModelsUser(req.headers.host);
				var value = { email: req.body.email };
				user_check.find(value, function callbacks(results) {
					// CHECK IF THERE ARE OTHER USER
					if (results.length == 0) {
						var user_insert = new ModelsUser(req.headers.host);
  						var shasum = crypto.createHash('sha1');
						shasum.update(req.body.password);
	
						var value = {
							email: req.body.email, 
							firstname: req.body.firstname, 
							surname: req.body.surname, 
							password: shasum.digest('hex')
						};
						if (req.body.role) {
							value.role = req.body.role;
						} else {
							value.role = "user";
						}
						user_insert.insert(value, function callbacks(results) {
							var message = {
								action: '', 
								reference: 'registrated',
								value: ''
							};
							var data = { 
								form: {form_user: false},
								data_user: results
							};
							utils.rendering(req.headers.host, 'registration', data, req.session.info, req.session.lang, message, function callback(layout) {
								res.end(layout);
							});
						});
					} else {
						var message = {
							action: 'action-error', 
							reference: 'alreadyexists',
							value: errors
						};
						var data = {
							email: req.body.email,
							firstname: req.body.firstname,
							surname: req.body.surname,
						};
						utils.rendering(req.headers.host, 'registration', data, req.session.info, req.session.lang, message, function callback(layout) {
							res.end(layout);
						});
					}

				}); 

			}
		});

	}