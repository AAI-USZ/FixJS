function() {
					// Try IE userData
					if (tinymce.isIE) {
						ed.getElement().style.behavior = "url('#default#userData')";

						// Fake localStorage on old IE
						return {
							autoExpires : TRUE,

							setItem : function(key, value) {
								var userDataElement = ed.getElement();

								userDataElement.setAttribute(key, value);
								userDataElement.expires = self.getExpDate();
								userDataElement.save("TinyMCE");
							},

							getItem : function(key) {
								var userDataElement = ed.getElement();

								userDataElement.load("TinyMCE");

								return userDataElement.getAttribute(key);
							},

							removeItem : function(key) {
								ed.getElement().removeAttribute(key);
							}
						};
					}
				}