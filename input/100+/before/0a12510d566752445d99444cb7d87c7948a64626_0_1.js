function() {



	//

	// Global Namespace definitions

	//

	window.App = [];

	window.expanz = window.expanz || {};



	window.expanz.logToConsole = function(message) {

		if (typeof (console) != "undefined" && console.log) {

			console.log(message);

		}

	};



	window.expanz.getLoginURL = function() {

		var loginUrl = window.config._loginpage;

		/* if login url is null try to guess it by removing the filename */

		if (loginUrl === undefined) {

			loginUrl = document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/"));

			/* if empty mean we are at the root of the website */

			if (loginUrl == "")

				loginUrl = "/";

		}

		// window.expanz.logToConsole("getLoginURL : " + loginUrl);

		return loginUrl;

	};



	window.expanz.getMaintenancePage = function() {

		return 'maintenance.html';

	};



	window.expanz.isOnMaintenance = function() {

		var maintenance = window.config.maintenance;

		if (maintenance === true) {

			return true;

		}

		return false;

	};



	window.expanz.messageController = {



		initialize : function() {



			/* load resource bundle */

			if (window.config._useBundle !== false) {

				jQuery.i18n.properties({

					name : 'Messages',

					path : 'assets/bundle/',

					mode : 'map',

					language : ' ', /* set to en to load Messages-en.properties as well, set to '' to load as well Messages-en-XX.properties - add to config.js if different for some customers */

					cache : true,

					callback : function() {

						// window.expanz.logToConsole("Bundle loaded");

					}

				});

			}

		},



		addErrorMessageByText : function(messageText) {

			this._addMessageByText(messageText, 'error');

		},



		addWarningMessageByText : function(messageText) {

			this._addMessageByText(messageText, 'warning');

		},



		addInfoMessageByText : function(messageText) {

			this._addMessageByText(messageText, 'info');

		},



		addSuccessMessageByText : function(messageText) {

			this._addMessageByText(messageText, 'success');

		},



		_addMessageByText : function(messageText, messageType) {

			if (window.config._useBundle === true) {

				/* find the key with regexp */

				if (typeof window.expanz.messageController.findKey != 'function') {

					window.expanz.logToConsole('You need to define window.expanz.messageController.findKey in your client implementation');

					return;

				}

				var data = window.expanz.messageController.findKey(messageText);

				if (data != null) {

					this._addMessageByKey(data['key'], data['data'], messageType, data['popup']);

				}

				else {

					if (window.config._showAllMessages === true && messageText != "") {

						this.displayMessage('[Displayed for debugging only]' + messageText, messageType);

					}

				}

			}

			else {

				this.displayMessage(messageText, messageType);

			}



		},



		/* server doesn't send key anymore so it will be for futur use */

		addErrorMessageByKey : function(messageKey, messageData) {

			this._addMessageByKey(messageKey, messageData, 'error');

		},



		addInfoMessageByKey : function(messageKey, messageData) {

			this._addMessageByKey(messageKey, messageData, 'info');

		},



		addWarningMessageByKey : function(messageKey, messageData) {

			this._addMessageByKey(messageKey, messageData, 'warning');

		},



		addSuccessMessageByKey : function(messageKey, messageData) {

			this._addMessageByKey(messageKey, messageData, 'success');

		},



		_addMessageByKey : function(messageKey, messageData, messageType, popup) {

			/* look for the key in message.properties file */

			var msg = jQuery.i18n.prop(messageKey, messageData);

			if (msg) {

				if (popup === true) {

					this.displayPopupMessage(msg, messageType);

				}

				else {

					this.displayMessage(msg, messageType);

				}

			}

			else {

				if (window.config._showAllMessages === true) {

					this.displayMessage('[Displayed for debugging only]' + messageKey + messageData, messageType);

				}

			}



		},



		displayMessage : function(message, type) {

			if (type == 'error') {

				this._basicMsgDisplay('[bind=message][type=error]')(message);

			}

			else if (type == 'warning') {

				this._basicMsgDisplay('[bind=message][type=error]')(message);

			}

			else if (type == 'info') {

				this._basicMsgDisplay('[bind=message][type=info]')(message);

			}

			else if (type == 'success') {

				this._basicMsgDisplay('[bind=message][type=success]')(message);

			}

			else {

				window.expanz.logToConsole('type ' + type + ' unknown for message ' + message);

			}

		},



		displayPopupMessage : function(message, type) {

			alert(message);

		},



		_basicMsgDisplay : function(el) {

			return function display(str) {



				var fade = true;

				if ($(el).attr('fade') && boolValue($(el).attr('fade')) === false) {

					fade = false;

				}



				if (str instanceof Array) {

					str = str.join("<br/>");

				}



				var msgDisplayedInPopup = false;



				/* display the message in the popup instead if visible */

				if (window.expanz.currentPopup !== undefined && $(window.expanz.currentPopup.el).is(":visible")) {

					var popupEl = window.expanz.currentPopup.el.find(el);

					if (popupEl) {

						msgDisplayedInPopup = true;

						popupEl.find('[attribute=value]').html(str);

						if (!str || str.length < 1) {

							$(popupEl).hide('slow');

						}

						else {

							$(popupEl).show(1, function() {

								if (fade) {

									$(popupEl).delay(5000).hide(1);

								}

							});

						}

					}

				}



				if (!msgDisplayedInPopup) {

					if ($(el).find('[attribute=value]').length > 0) {

						if (str && str.length > 0) {

							// check if message already displayed

							var existingMsgEl = null;

							if ($(el).find('div:contains("' + str + '")').length > 0) {

								existingMsgEl = $(el).find('div:contains("' + str + '")')[0];

								$(existingMsgEl).remove();

							}

							// make the error div visible

							$(el).show();

							// push the new message a div in the error div (will fade and be removed automatically after 5 sec)

							var newErrorId = 'msg_' + new Date().getTime();

							var divMessage = "<div id='" + newErrorId + "' class='message_item' style='display:none'>" + str + "</div>";

							$(el).find('[attribute=value]').append(divMessage);



							var messageItem = $(el).find("#" + newErrorId);



							// check if el is visible in the screen if not fix it to top of the visible page

							if (!isVisibleOnScreen($(el))) {

								// var top = document.body.scrollTop;

								$(el).css('top', "0px");

								$(el).css('position', 'fixed');

								$(el).css('z-index', '10000');

							}

							else {

								$(el).css('top', '');

								$(el).css('position', '');

							}



							messageItem.slideDown(100, function() {

								if (fade) {

									messageItem.delay(5000).slideUp(800, function() {

										messageItem.remove();

										// if it was the last message in the message notification area, we hide the notification area.

										if ($(el).find("div").length == 0) {

											$(el).hide();

										}

									});

								}

							});

						}

						else {

							if (!fade) {

								$(el).hide();

							}

						}

					}

				}

			};

		}



	};



	//

	// Public Functions & Objects in the Expanz Namespace

	//

	window.expanz.CreateActivity = function(DOMObject, callbacks, initialKey) {



		DOMObject || (DOMObject = $('body'));



		var activities = createActivity(DOMObject, callbacks, initialKey);

		_.each(activities, function(activity) {

			window.App.push(activity);

		});

		return activities;

	};



	window.expanz.CreateLogin = function(DOMObject, callbacks) {



		DOMObject || (DOMObject = $('body'));



		var login = createLogin(DOMObject, callbacks);

		return;

	};



	// window.expanz.DestroyActivity = function(DOMObject) {

	//

	// // find the given activity in list from the DOMObject

	// if ($(DOMObject).attr('bind').toLowerCase() === 'activity') {

	// var activityEl = DOMObject;

	// var activity = pop(window.App, {

	// name : $(activityEl).attr('name'),

	// key : $(activityEl).attr('key')

	// });

	// activity.collection.destroy();

	// activity.remove(); // remove from DOM

	// }

	// else {

	// // top-level DOMObject wasn't an activity, let's go through the entire DOMObject looking for activities

	// _.each($(dom).find('[bind=activity]'), function(activityEl) {

	// var activity = popActivity(window.App, $(activityEl).attr('name'), $(activityEl).attr('key'));

	// activity.model.destroy();

	// activity.remove(); // remove from DOM

	// });

	// }

	// return;

	// };



	window.expanz.Logout = function() {

		function redirect() {

			expanz.Storage.clearSession();

			expanz.Views.redirect(expanz.getLoginURL());

		}

		expanz.Net.ReleaseSessionRequest({

			success : redirect,

			error : redirect

		});

	};



	window.expanz.showManuallyClosedPopup = function(content, title, id, activity) {



		content = unescape(content);



		var clientMessage = new expanz.Model.ClientMessage({

			id : id,

			title : title,

			text : content,

			parent : activity

		});



		var loginPopup = new window.expanz.Views.ManuallyClosedPopup({

			id : clientMessage.id,

			model : clientMessage

		}, $('body'));



		return loginPopup;



	};



	window.expanz.showLoginPopup = function(activity, sessionLost) {

		var content = '';

		if (sessionLost === true) {

			content = '<div class="loginMsg">Sorry, your session timed out, please log in again.</div>';

		}

		else {

			content = '<div class="loginMsg">Please log in.</div>';

		}



		content += '<form bind="login" type="popup" name="login" action="javascript:">';

		content += '<div name="username" id="username">';

		content += '<input class="loginInput"  attribute="value" type="text" placeholder="Username"/>';

		content += '</div>';

		content += '<div name="password" id="password">';

		content += '<input class="loginInput" attribute="value" type="password" placeholder="Password"/>';

		content += '</div>';

		content += '<div name="login" id="login">';

		content += '<button type="submit" attribute="submit">login</button>';

		content += '</div>';

		content += '<div bind="message" type="error" class="error">';

		content += '<span attribute="value"></span>';

		content += '</div>';

		content += '</form>';



		loginPopup = window.expanz.showManuallyClosedPopup(content, 'Login', 'ExpanzLoginPopup', activity);



		/* set focus on username field */

		$("#username input").focus()



		createLogin(loginPopup.el.find('[bind=login]'));



		return;



	};



	window.expanz.createActivityWindow = function(parentActivity, id, style, key, title) {

		var callback = function(activityMetadata) {

			if (activityMetadata.url === null) {

				window.expanz.logToConsole("Url of activity not found");

			}



			/* case 'popup' */

			if (activityMetadata.onRequest == 'popup') {



				/* an activity request shouldn't be reloaded from any state -> clean an eventual cookie if popup was not closed properly */

				window.expanz.Storage.clearActivityHandle(id, style);



				var clientMessage = new expanz.Model.ClientMessage({

					id : 'ActivityRequest',

					url : activityMetadata.url + "?random=" + new Date().getTime(),

					parent : parentActivity,

					title : unescape(title || activityMetadata.title || '')

				});



				var popup = new window.expanz.Views.ManuallyClosedPopup({

					id : clientMessage.id,

					model : clientMessage

				}, $('body'));



				popup.bind('contentLoaded', function() {

					expanz.CreateActivity($(popup.el).find("[bind=activity]"), null, key);

				});



				popup.bind('popupClosed', function() {

					window.expanz.Storage.clearActivityHandle(id, style);

				});

			}

			/* case 'navigate' or default */

			else {

				window.location = activityMetadata.url + "?random=" + new Date().getTime() + "&" + id + style + "initialKey=" + key;

			}



		};



		/* find url of activity */

		window.expanz.helper.findActivityMetadata(id, style, callback);



	};



	window.expanz.defaultCallbacks = {

		success : function(message) {

			expanz.messageController.addSucessMessageByText(message);

		},

		error : function(message) {

			expanz.messageController.addErrorMessageByText(message);

		},

		info : function(message) {

			expanz.messageController.addInfoMessageByText(message);

		}

	};



	//

	// Helper Functions

	//



	window.expanz.helper.findActivity = function(activityId) {

		if (window && window.App) {

			for ( var i = 0; i < window.App.length; i++) {

				if (window.App[i].id == activityId) {

					return window.App[i];

				}

			}

		}

		return null;

	};



	window.expanz.helper.findActivityMetadata = function(activityName, activityStyle, callback) {

		var jqxhr = $.get('./formmapping.xml', function(data) {

			$(data).find('activity').each(function() {

				var name = $(this).attr('name');

				var url = $(this).attr('form');

				var onRequest = $(this).attr('onRequest');

				var title = $(this).attr('title');

				var style = $(this).attr('style');

				if (name == activityName && style == activityStyle) {

					var activityMetadata = {};

					activityMetadata.url = url;

					activityMetadata.onRequest = onRequest;

					activityMetadata.title = title;

					callback(activityMetadata);

					return;

				}

			});

		});

	};



	//

	// Private Functions

	//

	function createActivity(dom, callbacks, paramInitialKey) {



		var activities = [];



		var domActivities = [];



		if ($(dom).attr('bind') && ($(dom).attr('bind').toLowerCase() === 'activity')) {

			domActivities.push(dom);

		}

		else {

			// search through DOM body, looking for elements with 'bind' attribute

			_.each($(dom).find('[bind=activity]'), function(activityEl) {

				domActivities.push(activityEl);

			});

		}



		_.each(domActivities, function(activityEl) {



			var activityView = expanz.Factory.Activity(dom);



			/* look for initial key in the query parameters */

			var initialKey = paramInitialKey || getQueryParameterByName(activityView.collection.getAttr('name') + (activityView.collection.getAttr('style') || '') + 'initialKey');

			activityView.collection.setAttr({

				'key' : initialKey

			});



			activityView.collection.load(callbacks);

			activities.push(activityView);

		});



		return activities;

	}



	function createLogin(dom, callbacks) {



		var loginView;

		if ($(dom).attr('bind') && ($(dom).attr('bind').toLowerCase() === 'login')) {

			loginView = expanz.Factory.Login(dom);

		}



		return loginView;

	}



	function loadMenu(el, displayEmptyItems) {



		// Load Menu & insert it into #menu

		var menu = new expanz.Storage.AppSiteMenu();

		var processAreas = loadProcessArea(expanz.Storage.getProcessAreaList(), displayEmptyItems);

		if (processAreas.length > 0)

			menu.processAreas = processAreas;

		menu.load(el);

	}



	function loadProcessArea(processAreas, displayEmptyItems, parentProcessAreaMenu) {

		var processAreasMenu = [];

		_.each(processAreas, function(processArea) {

			if (displayEmptyItems || processArea.activities.length > 0 || processArea.pa.length > 0) {

				var menuItem = new expanz.Storage.ProcessAreaMenu(processArea.id, processArea.title);



				if (parentProcessAreaMenu)

					menuItem.parent = parentProcessAreaMenu;



				_.each(processArea.activities, function(activity) {

					if (displayEmptyItems || (activity.url !== '' && activity.url.length > 1)) {

						menuItem.activities.push(new expanz.Storage.ActivityMenu(activity.name, activity.style, activity.title, activity.url, activity.img));

					}

				});



				if (processArea.pa.length > 0) {

					menuItem.pa = loadProcessArea(processArea.pa, displayEmptyItems, menuItem);

				}



				if (displayEmptyItems || menuItem.activities.length > 0) {

					processAreasMenu.push(menuItem);

				}

			}

		});

		return processAreasMenu;

	}



	/* check if website is on maintenance or web server is down except on maintenance page */

	if (document.location.pathname.indexOf(window.expanz.getMaintenancePage()) === -1) {

		if (window.expanz.isOnMaintenance()) {

			expanz.Views.redirect(window.expanz.getMaintenancePage());

		}



		/* check if web server is down and last success was more than 1 minutes ago */

		var currentTime = (new Date()).getTime();

		var lastSuccess = window.expanz.Storage.getLastPingSuccess();

		if (lastSuccess === undefined || (currentTime - lastSuccess) > (1 * 60 * 1000)) {

			expanz.Net.WebServerPing(3);

		}

	}



	/* defined a fake console to avoid bug if any console.log have been forgotten in the code */

	if (!window.console) {

		window.console = {

			log : function(e) {

				// alert(e);

			}

		};

	}



	window.expanz.logToConsole("Loading menu, setting callbacks and creating activities");



	/* prompt the user to install chrome frame for IE6 */

	if ($.browser.msie && $.browser.version == "6.0") {

		loadjscssfile("//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js", "js");

		window.attachEvent('onload', function() {

			CFInstall.check({

				mode : 'overlay'

			});

		});

	}



	window.expanz.messageController.initialize();



	/* Load the Expanz Process Area menu without empty items */

	_.each($('[bind=menu]'), function(el) {

		loadMenu($(el), false);

	});



	/* create login if exists */

	expanz.CreateLogin($('[bind=login]'));



	/* create all activities where autoLoad attribute is not set to false */

	_.each($('[bind=activity][autoLoad!="false"]'), function(el) {

		expanz.CreateActivity($(el));

	});



	/* load UI plugin */

	var expanzPlugin = $("body").attr("expanzPlugin");

	if (expanzPlugin) {

		switch (expanzPlugin) {

			case "kendo":

				if (typeof useKendo == 'function')

					useKendo();

				else

					window.expanz.logToConsole("useKendo method is undefined");

				break;



			case "kendoMobile":

				if (typeof useKendoMobile == 'function')

					useKendoMobile();

				else

					window.expanz.logToConsole("useKendoMobile method is undefined");

				break;



			default:

				break;

		}

	}



}