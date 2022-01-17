function($) {

"use strict";

if (Echo.Utils.isComponentDefined("Echo.IdentityServer.Controls.Auth")) return;

var auth = Echo.Control.skeleton("Echo.IdentityServer.Controls.Auth");

auth.config = {
	"param": "test value"
};

auth.labels = {
	"edit": "Edit",
	"login": "Login",
	"logout": "Logout",
	"loggingOut": "Logging out...",
	"or": "or",
	"signup": "signup"
};

auth.events = {
	"internal.User.onInvalidate": function() {
		// TODO: pass control ref as "this"
		$.fancybox.close();
		this.rerender();
	}
};

auth.templates.anonymous =
	'<div class="echo-auth-anonymous echo-primaryFont">' +
		'<span class="echo-auth-login echo-linkColor echo-clickable" data-renderer="login">' +
			"{Label:login}" +
		'</span>' +
		'<span class="echo-auth-or echo-secondaryColor"> {Label:or} </span>' +
		'<span class="echo-auth-signup echo-linkColor echo-clickable" data-renderer="signup">' +
			"{Label:signup}" +
		'</span>' +
	'</div>';

auth.templates.logged =
	'<div class="echo-auth-logged echo-primaryFont echo-primaryColor">' +
		'<div class="echo-auth-avatar" data-renderer="avatar"></div>' +
		'<div class="echo-auth-name"></div>' +
		'<div class="echo-auth-edit echo-linkColor echo-clickable">' +
			"{Label:edit}" +
		'</div>' +
		'<div class="echo-auth-logout echo-linkColor echo-clickable">' +
			"{Label:logout}" +
		'</div>' +
		'<div class="echo-clear"></div>' +
	'</div>';

auth.renderers.logout = function(element) { 
	var self = this;
	return element.click(function() {
		element.empty().append(self.label("loggingOut"));
		self.user.logout();
	});
};

auth.renderers.login = function(element) {
	return this.assembleIdentityControl("login", element);
};

auth.renderers.edit = function(element) {
	return this.assembleIdentityControl("edit", element);
};

auth.renderers.signup = function(element) {
	return this.assembleIdentityControl("signup", element);
};

auth.renderers.or = function(element) {
	if (!this.config.get("identityManager.login") ||
		!this.config.get("identityManager.signup") ||
		!this.user.get("sessionID")) {
			element.hide();
	}
	return element;
};

auth.renderers.avatar = function(element) {
	var self = this;
	var url = this.user.get("avatar", this.user.config.get("defaultAvatar"));
	return element.append(
		$("<img>", { "src": url }).bind({
			"error" : function(){
				$(this).attr("src", self.user.get("defaultAvatar"));
			}
		})
	);
};

auth.renderers.name = function(element) {
	return element.append(this.user.get("name", ""));
};

auth.methods.template = function() {
	return this.templates[this.user.is("logged") ? "logged" : "anonymous"];
};

auth.methods.assembleIdentityControl = function(type, element) {
	var self = this;
	var data = this.config.get("identityManager." + type);
	if (!data || !Backplane.getChannelID()) return element.hide();

	var appendSessionID = function(url) {
		var id = encodeURIComponent(Backplane.getChannelID());
		var parts = Echo.Utils.parseURL(url);
		var session = parts["query"]
			? parts["query"].match(/=$/) ? id : "&sessionID=" + id
			: "sessionID=" + id;
		return self.substitute("{Data:scheme}://{Data:domain}{Data:path}?{Data:query}{Data:fragment}", {
			"scheme": parts["scheme"] || "http",
			"domain": parts["domain"],
			"path": parts["path"],
			"query": (parts["query"] || "") + session,
			"fragment": parts["fragment"] ? ("#" + parts["fragment"]) : ""
		});
	};
	if (data.type == "script") {
		return element.click(function() {
			$.getScript(appendSessionID(data.url));
		});
	} else {
		return element.fancybox({
			"autoScale": false,
			"height": data.height,
			"href": appendSessionID(data.url),
			"onClosed": function() {
				// remove dynamic height/width calculations for overlay
				if ($.browser.msie && document.compatMode != "CSS1Compat") {
					var style = $("#fancybox-overlay").get(0).style;
					style.removeExpression("height");
					style.removeExpression("width");
				}
			},
			"onComplete": function() {
				// set fixed dimensions of the frame (for IE in quirks mode it should be smaller)
				var delta = ($.browser.msie && document.compatMode != "CSS1Compat" ? 40 : 0);
				$("#fancybox-frame").css({
					"width": data.width - delta,
					"height": data.height - delta
				});
			},
			"onStart": function() {
				Backplane.expectMessages("identity/ack");
				// dynamical calculation of overlay height/width
				if ($.browser.msie && document.compatMode != "CSS1Compat") {
					var style = $("#fancybox-overlay").get(0).style;
					style.setExpression("height", "Math.max(document.body.clientHeight, document.body.scrollHeight)");
					style.setExpression("width", "Math.max(document.body.clientWidth, document.body.scrollWidth)");
				}
			},
			"padding": 0,
			"scrolling": "no",
			"transitionIn": "elastic",
			"transitionOut": "elastic",
			"type": "iframe",
			"width": data.width
		});
	}
};

auth.css =
	".echo-auth-logout { float: right; }" +
	".echo-auth-anonymous { text-align: right; }" +
	".echo-auth-avatar { float: left; }" +
	".echo-auth-avatar img { width: 24px; height: 24px; }" +
	".echo-auth-name { float: left; font-size: 18px; line-height: 24px; margin-left: 5px; font-weight: bold; }" +
	".echo-auth-edit { float: left; margin: 6px 0px 0px 12px; }";

Echo.Control.create(auth);

}