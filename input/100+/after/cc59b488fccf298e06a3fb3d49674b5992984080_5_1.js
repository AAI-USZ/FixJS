function(view) {
		var identity = this,
			identityController = this.identityController,
			identityData,
			app = JustDive;
		identityData = {
			'identity': {
							'email': 	identity.get('email'),
							'password': identity.get('password'),
							'app_key':	JustDive.APP_KEY
						},
			'utf8': "&#x2713;"
		};
		jQuery.ajax({
				url: 		identity.rest_routes.create,
				type: 		'POST',
				dataType: 	'json',
				headers: 	{
								'X-CSRF-Token': identity.get('authenticity_token')
							},
				data: 		identityData,
				success: 	function(savedIdentity) {
								app.localStorage.setItem(identity.local_store_id, JSON.stringify(savedIdentity));
								identity.set('administrator_id', savedIdentity.administrator_id);
								identity.set('is_logged_in', true);
								identity.set('password', '');
								JustDive.router.set('location', 'account/welcome');
							},
				error: 		function(jqXHR, textStatus, errorThrown) {
								error = JSON.parse(jqXHR.responseText);
								if (error.password !== undefined) {
									readableError = error.password.join('<br />');
								} else {
									readableError = jqXHR.responseText;
								}
								view.set('error', readableError);
				}
			});
	}