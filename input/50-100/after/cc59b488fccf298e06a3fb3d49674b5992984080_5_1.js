function(savedIdentity) {
								app.localStorage.setItem(identity.local_store_id, JSON.stringify(savedIdentity));
								identity.set('administrator_id', savedIdentity.administrator_id);
								identity.set('is_logged_in', true);
								identity.set('password', '');
								JustDive.router.set('location', 'account/welcome');
							}