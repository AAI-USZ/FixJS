function () {
					if (wet_boew_theme !== null) {
						// Initialize the theme
						wet_boew_theme.init();

						//Load the mobile view
						if (pe.mobile === true) {
							if (wet_boew_theme !== null) {
								wet_boew_theme.mobileview();
							}
							$(document).on("mobileinit", function () {
								//$.mobile.loadingMessage = false;
								$.mobile.ajaxEnabled = false;
								$.mobile.pushStateEnabled = false;
							});
							// preprocessing before mobile page is enhanced
							$(document).on("pageinit", function () {
							});
						}
					}
					pe.dance();
				}