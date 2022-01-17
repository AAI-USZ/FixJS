function() {
var getCSRFToken = function(window) {
	// XXX: should not use RegEx - cf.
	// http://www.quirksmode.org/js/cookies.html
	// https://github.com/TiddlySpace/tiddlyspace/commit/5f4adbe009ed4bda3ce39058a3fb07de1420358d
	var regex = /^(?:.*; )?csrf_token=([^(;|$)]*)(?:;|$)/;
	var match = regex.exec(document.cookie);
	var csrf_token = null;
	if (match && (match.length === 2)) {
		csrf_token = match[1];
	}

	return csrf_token;
};
$.ajaxSetup({
	beforeSend: function(xhr) {
		xhr.setRequestHeader("X-ControlView", "false");
	}
});

window.getCSRFToken = getCSRFToken;

var ts = {
	currentSpace: false,
	locale: {
		error: "An error occurred",
		tryAgain: "Please try again",
		success: "Clear this notification",
		badLogin: "Whoops! We can't log you in with those details. Can you provide some others?",
		charError: "Username is invalid - must only contain lowercase " +
			"letters, digits or hyphens",
		spaceSuccess: "Successfully created space.",
		userError: "Username is already taken, please choose another.",
		passwordError: "Passwords do not match",
		invalidSpaceError: ["error: invalid space name - must start with a letter, be ",
			"at least two characters in length and only contain lowercase ",
			"letters, digits or hyphens"].join("")
	},
	status: {},
	user: {},
	messages: {
		display: function(form, msg, error, options) {
			options = options || {};
			if(options.hideForm) {
				$(".inputArea", form).hide();
			} else {
				$(".inputArea", form).show();
			}
			var msgArea = $(".messageArea", form);
			if(msgArea.length === 0) {
				msgArea = $('<div class="messageArea" />').prependTo(form);
			}
			msgArea.html(msg || ts.locale.error).show(100);
			if(error) {
				msgArea.addClass("error annotation");
			}
			if(options.annotate) {
				$(options.annotate, form).addClass("annotation");
			}
			var container = $("<div />").appendTo(msgArea)[0];
			var label = error ? ts.locale.tryAgain : ts.locale.success;
			$("<a />").text(label).click(function(ev) {
					var form = $("form", $(ev.target).parents());
					ts.messages.reset(form);
				}).appendTo(container);
		},
		reset: function(form) {
			$(".annotation", form).removeClass("annotation");
			$(".messageArea", form).empty().removeClass("error").hide();
			$(".inputArea", form).show();
		}
	},
	resolveCurrentSpaceName: function(options, host) {
		if(options && typeof(options.space) != "undefined") {
			ts.currentSpace = options.space;
		} else if(window.location.protocol !== "file:") {
			if(host.split(".").length < window.location.hostname.split(".").length) {
				ts.currentSpace = window.location.hostname.split(".")[0];
			}
		}
	},
	isValidSpaceName: function(name) {
		return name.match(/^[a-z][0-9a-z\-]*[0-9a-z]$/) ? true : false;
	},
	init: function(callback, options) {
		ts.loadHash();
		var register = $("form.ts-registration").addClass("tsInitializing")[0];
		var login = $("form.ts-login").addClass("tsInitializing")[0];
		var logout = $(".ts-logout").addClass("tsInitializing")[0];
		var openid = $("form.ts-openid")[0];

		$("input[type=submit]", [login, logout, register, openid]).attr("disabled", true);
                var status = tiddlyweb.status;
                if (status) {
                    options = options || {};
                    options.space = status.space && status.space.name &&
                            typeof(options.space) === "undefined" ? status.space.name : options.space;
                    ts.resolveCurrentSpaceName(options, status.server_host.host);
                    if(!ts.currentSpace) {
                            $(document.body).addClass("ts-unknown-space");
                    }
                    $(register).removeClass("tsInitializing");
                    $(login).removeClass("tsInitializing");
                    $(logout).removeClass("tsInitializing");
                    $("input[type=submit]", [login, logout, register, openid]).attr("disabled", false);
                    ts.loadStatus(status);
                    if(status.identity || ts.parameters.openid) {
                            ts.register_openid(status.identity);
                    } else if(status.username && ts.parameters.openid) {
                            // open id login occurred so redirect to homespace
                            window.location.href = ts.parameters.redirect ? ts.parameters.redirect : ts.getHost(status.username);
                    }
                    // do login status
                    ts.forms.password($("form.ts-password")[0]);
                    ts.loginStatus(login, register, logout);
                    if(ts.currentSpace && (
                            window.location.pathname == '/_space'
                            || window.location.pathname == '/_account')) {
                            ts.initForSpace_();
                    }
                    if(callback) {
                            callback(ts);
                    }
                }
	},
	initForSpace_: function() {
		new tiddlyweb.Space(ts.currentSpace, "/").members().get(function() {
			$(document.body).addClass("ts-member");
			ts.forms.addInclude($("form.ts-includes")[0]);
			ts.forms.addMember($("form.ts-members")[0]);
			ts.forms.addSpace($("form.ts-spaces")[0]);
		}, function() {
			$(document.body).addClass("ts-nonmember");
		});
		ts.initLists();
	},
	getSpaces: function(callback) {
		if(ts.spaces) {
			callback(ts.spaces);
		} else {
			$.ajax({ url: "/spaces?mine=1", dataType: "json",
				success: function(spaces) {
					ts.spaces = spaces;
					callback(ts.spaces);
				},
				error: function() {
					ts.spaces = false;
				}
			});
		}
	},
	initLists: function() {
		ts.lists.identities();
		ts.lists.members();
		ts.lists.includes();
	},
	loadStatus: function(status) {
		ts.status = status;
		ts.user = {
			name: status.username,
			anon: status.username ? status.username == "GUEST" : true
		};
	},
	getHost: function(subdomain) {
		var s = ts.status;
		var host = s.server_host;
		subdomain = subdomain ? subdomain + "." : "";
		var url = host.scheme + "://" + subdomain + host.host;
		var port = host.port;
		if(port && port !== "80" && port != "443") {
			url += ":" + port;
		}
		return url;
	},
	login: function(username, password, options) {
		var status = ts.status;
		options = options || {};
		var success = options.success || function() {
			window.location = options.redirect || ts.getHost(username);
		};
		var errback = options.errback || function() {};
		var challenger = options.challenger ? options.challenger : "tiddlywebplugins.tiddlyspace.cookie_form";
		var uri = "/challenge/" + challenger;
		$.ajax({ url: uri, type: "POST",
			data: {
				user: username,
				password: password,
				csrf_token: window.getCSRFToken(),
				tiddlyweb_redirect: "/status" // workaround to marginalize automatic subsequent GET
			},
			success: success,
			error: errback
		});
	},
	parameters: {},
	loadHash: function() {
		var args = window.location.search.substr(1).split("&");
		for(var i = 0; i < args.length; i++) {
			var nameval = args[i].split("=");
			if(nameval.length == 2) {
				ts.parameters[nameval[0]] = nameval[1];
			}
		}
	},
	_register_openid_for_user: function(username, openid) {
		var user = new tiddlyweb.User(username, null, "/");
		user.identities().add(openid, function() {
			window.location.href = window.location.pathname;
		}, function() {
			throw "failed to add identity to current user.";
		});
	},
	register_openid: function(openid) {
		var space = ts.parameters.space;
		var username = ts.parameters.user;
		if(!space && !username) {
			var answer = confirm("Would you like to create a space with your openid: " + openid  + "?");
			if(answer) {
				space = prompt("What would you like to be your TiddlySpace username?");
			}
		}
		if(space && openid) {
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var password = "";
			while(password.length < 16) {
				password += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			// register user with username of space and random password
			ts.register(space, password, null, {
				errback: function() {
					throw "failed at step 1/3";
				},
				success: function() {
					// login as that newly created user
					ts.login(space, password, {
						success: function() {
							ts._register_openid_for_user(space, openid);
						},
						errback: function() {
							throw "failed at step 2/3";
						}
					});
				}
			});
		} else if(username) {
			ts._register_openid_for_user(username, ts.parameters.openid);
		}
	},
	register: function(username, password, form, options) {
		options = options || {}
		var spaceCallback = options.success || function() {
			ts.messages.display(form, ts.locale.spaceSuccess, false);
			window.location = options.redirect || ts.getHost(username);
		};
		var spaceErrback = function(xhr, error, exc) {
			var msg = xhr.status === 409 ? ts.locale.userError : false; // XXX: 409 unlikely to occur at this point
			ts.messages.display(form, msg, true, options);
		};
		var userCallback = function(resource, status, xhr) {
			ts.login(username, password, {
				success: function(data, status, xhr) {
					var space = new tiddlyweb.Space(username, "/");
					space.create(spaceCallback, spaceErrback);
				}
			});
		};
		var userErrback = function(xhr, error, exc) {
			var msg = xhr.status === 409 ? ts.locale.userError : false;
			ts.messages.display(form, msg, true, options);
		};
		var user = new tiddlyweb.User(username, password, "/");
		user.create(userCallback, userErrback);
	},
	createSpace: function(form, spaceName, callback, errback) {
		if(ts.isValidSpaceName(spaceName)) {
			var space = new tiddlyweb.Space(spaceName, "/");
			space.create(callback, errback);
		} else {
			ts.messages.display(form, ts.locale.invalidSpaceError,
				true, { selector: "[name=space]" });
		}
	},
	changePassword: function(username, password, npassword, form) {
		var pwCallback = function() {
			var msg = "Successfully changed your password.";
			ts.messages.display(form, msg);
		};
		var pwErrback = function() {
			var msg = "Old password is incorrect.";
			ts.messages.display(form, msg, true, { selector: "[name=password]" });
		};
		var user = new tiddlyweb.User(username, password, "/");
		user.setPassword(npassword, pwCallback, pwErrback);
	},
	lists: {
		identities: function() {
			var list = $("ul.ts-identities")[0];
			if(!list) {
				return;
			} else {
				$(list).addClass("ts-loading");
			}
			var user = new tiddlyweb.User(ts.user.name, null, "/");
			user.identities().get(
				function(identities) {
					$(list).removeClass("ts-loading").empty();
					for(var i = 0; i < identities.length; i++) {
						$("<li />").text(identities[i]).appendTo(list);
					}
				}, function() {
					$(list).removeClass("ts-loading").empty();
				});
		},
		includes: function() {
			var space = new tiddlyweb.Space(ts.currentSpace, "/");
			var removeInclusion = function(ev) {
				var item = $(ev.target).parents("li")[0];
				var target_space = $(ev.target).data("inclusion");
				var callback = function() {
					$(item).hide(200);
				};
				var errback = function() {};
				space.includes().remove(target_space, callback, errback);
			};
			var list = $("ul.ts-includes").addClass("ts-loading")[0];
			if(list) {
				var callback = function(inclusions) {
					$(list).removeClass("ts-loading").empty();
					for(var i = 0; i < inclusions.length; i++) {
						var item = $("<li />").appendTo(list)[0];
						$("<a />").text(inclusions[i]).attr("href", ts.getHost(inclusions[i])).appendTo(item);
						$("<button />").addClass("delete").data("inclusion", inclusions[i]).attr("inclusion", inclusions[i]).text("remove").
							click(removeInclusion).appendTo(item);
					}
				};
				var errback = function(xhr, error, exc) {
					$(list).removeClass("ts-loading").empty();
					$("<li class='annotation' />").text("Only members can see other inclusions.").prependTo(list);
				};
				space.includes().get(callback, errback);
			}
		},
		members: function() {
			var space = new tiddlyweb.Space(ts.currentSpace, "/");
			var removeMember = function(ev) {
				var list = $(ev).parents("ul.members")[0];
				var item = $(ev.target).parents("li")[0];
				var member = $(ev.target).data("member");
				var callback = function() {
					$(item).hide(200, function() {
						$(item).remove();
						if($("ul.members li:visible").length > 1) {
							$("button.delete", list).show();
						}
					});
					$("button.delete", list).hide();
				};
				var errback = function() {
					
				}
				space.members().remove(member, callback, errback);
			};
			var list = $("ul.ts-members").addClass("ts-loading")[0];
			if(list) {
				var callback = function(members) {
					$(list).removeClass("ts-loading").empty();
					members = members.sort();
					for(var i = 0; i < members.length; i++) {
						var item = $("<li />").appendTo(list)[0];
						$("<a />").text(members[i]).attr("href", ts.getHost(members[i])).appendTo(item);
						if(members.length > 1) {
							$("<button />").addClass("delete").data("member", members[i]).attr("member", members[i]).text("remove").
								click(removeMember).appendTo(item);
						}
					}
				};
				var errback = function(xhr, error, exc) {
					$(list).removeClass("ts-loading").empty();
					$("<li class='annotation' />").text("Only members can see other members.").prependTo(list);
				};
				space.members().get(callback, errback);
			}
		}
	},
	forms: {
		password: function(form) {
			$(form).submit(function(ev) {
				ev.preventDefault();
				var oldPass = $("[name=password]").val();
				var newPass = $("[name=new_password]").val();
				var newPass2 = $("[name=new_password_confirm]").val();
				if(newPass !== newPass2) {
					var msg = "Passwords do not match";
					ts.messages.display(form, msg, true,
						{ selector: "[name=new_password], [name=new_password_confirm]" });
				} else if(newPass.length < 6) {
					var msg = "Error: password must be at least 6 characters";
					ts.messages.display(form, msg, true, 
						{ selector: "[name=new_password],[name=new_password_confirm]" });
				} else {
					ts.changePassword(ts.user.name, oldPass, newPass, form);
				}
				return false;
			});
		},
		_csrf: function(form) {
			$('<input type="hidden" name="csrf_token" />').val(window.getCSRFToken()).appendTo(form);
		},
		addInclude: function(form, options) {
			if(!form) {
				return;
			}
			ts.forms._csrf(form);
			$(form).submit(function(ev) {
				ev.preventDefault();
				var input = $("input[name=spacename]", form);
				var space = input.val();
				var callback = function(data, status, xhr) {
					ts.lists.includes($("ul.ts-includes").empty()[0]);
					input.val("");
					ts.messages.reset(form);
				};
				var errback = function(xhr, error, exc) {
					msg = "Unable to include space with that name.";
					ts.messages.display(form, msg, true, { selector: "[name=spacename]" });
				};
				new tiddlyweb.Space(ts.currentSpace, "/").includes().
					add(space, callback, errback);
			});
		},
		addMember: function(form, options) {
			if(!form) {
				return;
			}
			ts.forms._csrf(form);
			$(form).submit(function(ev) {
				ev.preventDefault();
				var input = $("input[name=username]", form);
				var username = input.val();
				var callback = function(data, status, xhr) {
					ts.lists.members($("ul.ts-members").empty()[0]);
					input.val("");
					ts.messages.reset(form);
				};
				var errback = function(xhr, error, exc) {
					if(xhr.status === 409) { // conflict
						new tiddlyweb.Space(username, "/").members().get(function(members) {
							var spaceMembers = new tiddlyweb.Space(ts.currentSpace, "/").members();
							for(var i = 0; i < members.length; i++) {
								spaceMembers.add(members[i], callback, errback);
							}
						}, function(xhr2) {
							if(xhr2.status === 403) {
								ts.messages.display(form, "Unable to add members from a space you are not a member of",
									true, { selector: "[name=username]" });
							} else {
								ts.messages.display(form, "Unknown username entered.", true, { selector: "[name=username]" });
							}
						});
					} else {
						msg = "Unknown error occurred.";
						ts.messages.display(form, msg, true, { selector: "[name=username]" });
					}
				};
				new tiddlyweb.Space(ts.currentSpace, "/").members().
					add(username, callback, errback);
			});
		},
		addSpace: function(form) {
			if(!form) {
				return;
			}
			var selector = "[name=spacename]";
			ts.forms._csrf(form);
			$(form).submit(function(ev) {
				ev.preventDefault();
				var spaceName = $(selector, form).val() || "";
				var callback = function() {
					var host = ts.getHost(spaceName);
					var msg = "Successfully created <a href='" + host + "'>" + host + "</a>."; 
					ts.messages.display(form, msg, false, { selector: selector });
				};
				var errback = function() {
					var msg = "Problem creating a space with that name.";
					ts.messages.display(form, msg, true, { selector: selector });
				};
				ts.createSpace(form, spaceName, callback, errback);
			});
		},
		register: function(form, options) {
			options = options || {};
			ts.forms._csrf(form);
			$(form).submit(function(ev) {
				ev.preventDefault();
				var username = $("[name=username]", form).val();
				var password = $("[name=password]", form).val();
				options.redirect = $("[name=redirect]", form).val();
				var passwordConfirm = $("[name=password_confirm]", form).val();
				var validName = ts.isValidSpaceName(username);
				if(validName && password && password === passwordConfirm) { // TODO: check password length?
					ts.register(username, password, ev.target, options);
				} else {
					var msg = validName ? ts.locale.passwordError : ts.locale.charError;
					options.annotate = validName ? "[type=password]" : "[name=username]";
					ts.messages.display(form, msg, true, options);
				}
				return false;
			});
		},
		openid: function(form, options) {
			ts.forms._csrf(form);
			$(form).attr("method", "post").
				attr("action", "/challenge/tiddlywebplugins.tiddlyspace.openid").
				submit(function(ev) {
				var identity = $("input[name=openid]", form).val();
				var space = $("input[name=space]", form).val();
				var user = options && options.user ? options.user.name : null;
				if(!identity) {
					ev.preventDefault();
					return ts.messages.display(form, "Please provide an openid!");
				}
				var querystring = "?openid=" + identity;
				if(space) {
					querystring += "&space=" + space;
				}
				if(user) {
					querystring += "&user=" + user;
				}
				var redirect = $("[name=redirect]", form).val();
				if(redirect) {
					querystring += "&redirect=" + redirect;
				}
				// IMPORTANT: #auth:OpenID=<openid> is read by the openid tiddlyweb plugin
				// when present it keeps you logged in as your cookie username
				$('<input name="tiddlyweb_redirect" type="hidden" />').
					val(window.location.pathname + querystring + "#auth:OpenID=" + identity).appendTo(form);
			});
		},
		logout: function(form_or_container) {
			if(!form_or_container) {
				return;
			}
			var tag = form_or_container.nodeName;
			var form;
			var isContainer = tag !== "FORM";
			if(isContainer) {
				var uri = ts.getHost(ts.user.name);
				var link = $("<a />").attr({"href": uri,
					"target": "_parent"}).text(ts.user.name)[0];
				var msg = $("<span class='message' />").text("Welcome back ").prependTo(form_or_container)[0];
				$(msg).append(link);
				$("<span />").text("!").appendTo(msg);
				form = $("form", form_or_container)[0];
				if(!form) {
					form = $('<form />').appendTo(form_or_container)[0];
					$('<input type="submit" class="button" value="Log out">').appendTo(form);
				}
			}  else {
				form = form_or_container;
			}
			$(form).attr("action", "/logout").attr("method", "post");
			ts.forms._csrf(form);
		},
		login: function(form) {
			// do login
			ts.forms._csrf(form);
			var options = {
				errback: function(xhr, error, exc) {
					var code = xhr.status;
					if(code == 401) {
						ts.messages.display(form, ts.locale.badlogin, true);
					} else {
						ts.messages.display(form, ts.locale.tryAgain, true);
					}
				}
			};
			$(form).submit(function(ev) {
				var user = $("input[name=username]", form).val();
				var pass = $("input[name=password]", form).val();
				if(!user) {
					return ts.messages.display(form, "Please provide a username!");
				}
				if(!pass) {
					return ts.messages.display(form, "Please provide a password!");
				}
				options.redirect = $("input[name=redirect]", form).val();
				ts.login(user,
					pass, options);
				ev.preventDefault();
			});
		}
	},
	loginStatus: function(login, register, logout) {
		var status = ts.status;
		var user = ts.user;
		$("form.ts-openid").each(function(i, el) {
			ts.forms.openid(el, { user: user });
		});
		if(!user.anon) {
			$(document.body).addClass("ts-loggedin");
			$([register, login]).remove();
			$(".ts-logout").each(function(i, el) {
				ts.forms.logout(el);
			});
		} else {
			if(register) {
				ts.forms.register(register);
			}
			if(login) {
				ts.forms.login(login);
			}
			$(".ts-logout").remove();
		}
	}
};
window.ts = {
	init: ts.init
};

}