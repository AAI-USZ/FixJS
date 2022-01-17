function (newUrl) {
									//if (!newUrl) return;
									if (state != 'confirming-user-authorization') return;

									extension.closeTab(id);
									oauth.setCallbackUrl('');
									if (baseUrl(newUrl) == baseUrl(oauthCallbackUrl)) {
										var q = queryToObject(newUrl);
										if (q.fs != backend) return;
										if (q.oauth_token == oauth.getAccessTokenKey()) {
											state = 'no-access-token';
											uid = q.uid;
											thisFunc();
										}
										else {
											operationQueue = [{method:'authorize', tabId:tabId}];
											handleOAuthError('Invalid authentication.');
										}
									}
									else {
										operationQueue = [{method:'authorize', tabId:tabId}];
										handleOAuthError('Authentication declined: ' + baseUrl(newUrl));
									}
								}